import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import ms from 'connect-mongo';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import fetch from "node-fetch";
import Clarifai from 'clarifai';
import multer from 'multer';
import path from'path';

let URL = 'https://lit-waters-99772.herokuapp.com';
//URL = 'https://9d627f81.ngrok.io';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`)
  }
});


const upload = multer({storage: storage});

//Import Models
import User from './models/User';
import HashtagSet from './models/HashtagSet';
import PostTemplate from './models/PostTemplate';

const clarifai = new Clarifai.App({apiKey: process.env.CLARIFAI_API_KEY});

const MongoStore = ms(session);

let app = express();

app.use(express.static(path.join(__dirname, '../socialstachefrontend/build')));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(cookieParser('hi'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .catch((err) => { console.log(err); });

app.use(session({
  secret: 'mysecretisthisrandomstringofletters',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.get('/', (req, res) => {
  res.send('Testing');
});

app.post('/suggestTags', (req, res) => {
  clarifai.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    .then(generalModel => {
      return generalModel.predict(req.body.image);
    })
    .then(response => {
      let concepts = response['outputs'][0]['data']['concepts'];
      res.json(concepts);
    }).catch(error => {
      console.log(error);
      res.json(error);
    });
});

app.post('/upload', upload.single('inputfile'), (req, res) => {
  //console.log('Updating files');
  const image = `${URL}/${req.file.destination}/${req.file.filename}`;
  clarifai.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    .then(generalModel => {
      return generalModel.predict(image);
    })
    .then(response => {
      let concepts = response['outputs'][0]['data']['concepts'];
      console.log(concepts);
      let tags = concepts.filter(item => item.value > 0.6).map(item => item.name);
      fetch(`https://api.ritekit.com/v1/stats/hashtag-suggestions?image=${image}&client_id=${process.env.RITEKIT_CLIENT_ID}`, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }).then(response => response.json())
        .then(response => {
          console.log('Below is the response from RiteKit');
          console.log(response.data);
          let moreTags = response.data.map(item => item.hashtag);
          Array.prototype.push.apply(tags, moreTags);
          tags = tags.filter(tag => tag.indexOf(' ') === -1);
          res.json({success: true, tags: tags, image: image});
        }).catch(error => {
          res.json({success: true, tags: tags, message: 'Partial Success suggesting tags', error: error});
      })
    })
    .catch(error => {
      console.log(error);
      res.json({success: false, error: error, image: image})
    })
});

app.post('/setToken', (req, res) => {
 fetch(`https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Caccounts%7Bname%2Cinstagram_business_account%7Bname%2Cfollowers_count%2Cfollows_count%2Cmedia_count%2Cprofile_picture_url%7D%7D%2Cemail&access_token=${req.body.token}`, {
   headers: {
     'Content-Type': 'application/json; charset=utf-8',
   },
 }).then(response => response.json())
   .then(response => {
     User.findOneAndUpdate({facebookId: response.id}, {facebookToken: req.body.token, instagramAccounts: response.accounts.data})
       .then(result => {
         if(result) {
           console.log(`Set Token: Updated ${result.name}'s auth token...`);
           res.json({success: true, message: `Updated ${result.name}'s auth token`});
         } else {
           const newUser = new User({
             name: response.name,
             email: response.email,
             facebookId: response.id,
             instagramAccounts: response.accounts.data,
             facebookToken: req.body.token
           });
           newUser.save()
             .then(response => {
               console.log('Set Token: New user made');
               res.json({success: true, message: "Set Token: New User Created!"})
             })
             .catch(error => {
               console.log('Set Token: Could not create new user: ', error);
               res.json({success: false, message: "Set Token: Could not create new user!", error: error})
             })
         }
       })
   })
   .catch(error => {
     console.log("Set Token: Could not connect to Facebook... ", error);
     res.json({success: false, message: "Could not connect to Facebook", error: error})
   })
});

app.use((req, res, next) => {
  let token = req.get('facebookAuthToken');
  User.findOne({facebookToken: token})
    .then(response => {
      if(response) {
        req.user = response;
        next();
      } else {
        res.json({success: false, message: "Server Middleware: User not authenticated!"})
      }
    })
    .catch(error => {
      console.log('Error verifying user');
      res.json({success: false, message: "Unable to verify user...", error: error})
    })
});

app.get('/getInstagramPages', (req, res) => {
  res.json({success: true, accounts: req.user.instagramAccounts});
});

app.get('/accountStats/:user', (req, res) => {
  console.log(`Account Stats: Retrieving stats for ${req.params.user}`);
  const numberOfPosts = 15;
  fetch(`https://graph.facebook.com/v3.1/${req.params.user}/media?fields=comments_count%2Clike_count%2Ctimestamp&limit=${numberOfPosts}&access_token=${req.user.facebookToken}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  }).then(resp => resp.json())
    .then(response => {
      let like_total = 0;
      let comment_total = 0;
      response.data.forEach(post => {
        like_total += post.like_count;
        comment_total += post.comments_count;
      });
      res.json({
        success: true,
        likeAvg: like_total/response.data.length,
        commentAvg: comment_total/response.data.length,
        engagementAvg: (like_total + comment_total)/response.data.length,
        message: "Obtained Account stats!"
      })
    }).catch(error => {
      console.log("Could not get user's posts ", error);
      res.json({success: false, message: "Could not connect to Facebook to get engagement rate..."})
    })
});

app.get('/getPageInfo/:profileId', (req, res) => {
  console.log(`getPageInfo: Looking for ${req.params.profileId}`);
  let account = null;
  req.user.instagramAccounts.forEach(fbAccount => {
    if(fbAccount.instagram_business_account.id === req.params.profileId){
      account = igAccount;
    }
  });
  if(account) {
    res.send({success: true, account: account});
  } else {
    res.send({success: false, message: 'Could not find account'});
  }
});

app.get('/mySets', (req, res) => {
  HashtagSet.find({owner: req.user._id})
    .then(result => {
      res.json({success: true, message: 'Retrieved all sets!', sets: result})
    })
    .catch(error => {
      console.log('Error while getting sets: ', error);
      res.json({success: false, message: 'Error in getting sets!'})
    })
});

app.post('/newSet', (req, res) => {
  const newSet = new HashtagSet({
    title: req.body.title,
    hashtags: [],
    owner: req.user._id,
  });
  newSet.save()
    .then(result => {
      console.log("New hashtag set was saved!");
      res.json({success: true, message: "Your set was saved!", set: result})
    })
    .catch(error => {
      console.log("Could not save submitted hashtag set");
      res.json({success: false, message: "Could not save set!"})
    })
});

app.post('/deleteSet', (req, res) => {
  HashtagSet.findByIdAndDelete(req.body.id)
    .then(result => {
      console.log('Set was successfully deleted!', result);
      res.json({success: true, message: 'Set was successfully deleted!'});
    })
    .catch(error => {
      console.log('An error occurred while deleting set: ', error);
      res.json({success: false, message: 'Set was not deleted!'});
    })
});

app.post('/renameSet', (req, res) => {
  HashtagSet.findByIdAndUpdate(req.body.id, {title: req.body.title})
    .then(result => {
      res.json({success: true, message: 'Set was successfully renamed!'});
    })
    .catch(error => {
      console.log('An error occurred while renaming set: ', error);
      res.json({success: false, message: 'Set was not renamed!'});
    })
});

app.post('/updateTags', (req, res) => {
  HashtagSet.findByIdAndUpdate(req.body.id, {hashtags: req.body.tags})
    .then(result => {
      console.log('Set was updated!', result);
      res.json({success: true, message: 'Set was successfully updated!'})
    })
    .catch(error => {
      console.log('An error occurred while updating set: ', error);
      res.json({success: false, message: 'Set was not saved!'});
    })
});

app.post('/newTemplate', (req, res) => {
  const newTemplate = new PostTemplate({
    title: req.body.title,
    body: '',
    owner: req.user._id,
  });
  console.log(newTemplate);
  newTemplate.save()
    .then(result => {
      console.log("New template set was saved!");
      res.json({success: true, message: "Your template was saved!", template: result})
    })
    .catch(error => {
      console.log(error);
      console.log("Could not save submitted template");
      res.json({success: false, message: "Could not save template!"})
    })
});

app.get('/myTemplates', (req, res) => {
  PostTemplate.find({owner: req.user._id})
    .then(result => {
      res.json({success: true, message: 'Retrieved all templates!', templates: result})
    })
    .catch(error => {
      console.log('Error while getting templates: ', error);
      res.json({success: false, message: 'Error in getting templates!'})
    })
});

app.post('/deleteTemplate', (req, res) => {
  PostTemplate.findByIdAndDelete(req.body.id)
    .then(result => {
      console.log('Template was successfully deleted!', result);
      res.json({success: true, message: 'Template was successfully deleted!'});
    })
    .catch(error => {
      console.log('An error occurred while deleting template: ', error);
      res.json({success: false, message: 'Template was not deleted!'});
    })
});

app.post('/renameTemplate', (req, res) => {
  PostTemplate.findByIdAndUpdate(req.body.id, {title: req.body.title})
    .then(result => {
      console.log('Template was successfully renamed!', result);
      res.json({success: true, message: 'Template was successfully renamed!'});
    })
    .catch(error => {
      console.log('An error occurred while renaming template: ', error);
      res.json({success: false, message: 'Template was not renamed!'});
    })
});

app.post('/updateTemplate', (req, res) => {
  PostTemplate.findByIdAndUpdate(req.body.id, {body: req.body.body})
    .then(result => {
      console.log('Template was updated!', result);
      res.json({success: true, message: 'Template was successfully updated!'})
    })
    .catch(error => {
      console.log('An error occurred while updating template: ', error);
      res.json({success: false, message: 'Template was not saved!'});
    })
});

app.listen(process.env.PORT || 1337, () => console.log('Example app listening on port 1337!'));


