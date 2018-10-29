import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import ms from 'connect-mongo';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import fetch from "node-fetch";
import FacebookStrategy from 'passport-facebook';

//Import Models
import User from './models/User';

const MongoStore = ms(session);

let app = express();

app.use(cookieParser('hi'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .catch((err) => { console.log(err); });

app.use(session({
  secret: 'mysecretisthisrandomstringofletters',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// app.use(passport.initialize());
// app.use(passport.session());
//
// // Tell Passport how to set req.user
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
//
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "https://9a14bc78.ngrok.io/auth/facebook/callback",
//     profileFields: ['id', 'displayName', 'email', 'name']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOneAndUpdate({ facebookId: profile.id },
//       {facebookToken: accessToken}, function (err, user) {
//       console.log('Finding user...');
//       if(!user){
//         console.log('User not found. Creating new user');
//         const newUser = new User({
//           facebookId: profile._json.id,
//           name: profile._json.name,
//           email: profile._json.email,
//           facebookToken: accessToken,
//           instagramAccounts: []
//         });
//         newUser.save(function(error, result) {
//           return cb(error, result);
//         })
//       } else {
//         console.log('User found');
//         return cb(err, user);
//       }
//     });
//   }
// ));
//
// app.get('/auth/facebook',
//   passport.authenticate('facebook',
//     { scope:
//         [
//         'email',
//         'manage_pages',
//         'instagram_basic',
//         'instagram_manage_comments',
//         'instagram_manage_insights',
//         'pages_show_list',
//         'read_insights',
//         'leads_retrieval',
//         'business_management',
//         'read_audience_network_insights'
//         ]
//     })
// );
//
// // app.get('/auth/facebook/callback',
// //   passport.authenticate('facebook', { failureRedirect: '/'}),
// //   function(req, res) {
// //     //res.redirect('/');
// //     console.log("Successful login...");
// //     res.setHeader('content-type', 'application/json');
// //     res.json({success: true});
// // });
//
// app.get('/auth/facebook/callback', (req, res, next) => {
//   console.log('Attempting to log it...');
//   passport.authenticate('facebook', (err, user, info) => {
//     if (err) {
//       console.log(err);
//       return next(err);
//       //res.json({success: false, error: err})
//     }
//     if (!user) {
//       console.log('User not logged in');
//       return res.json({success: false, error: "User not logged in"})
//     }
//     req.login(user, (error) => {
//       if(error) {
//         console.log(error);
//         //res.json({success: false, error: error})
//         return next(error);
//       }
//       console.log("Success!" + req.user);
//       res.redirect("http://localhost:3000");
//       //res.json({success: true});
//     })
//   })(req, res, next);
// });

app.get('/', (req, res) => {
  res.send('Testing');
});

app.get('/test', (req, res) => {
  res.send('It works');
});

app.post('/setToken', (req, res) => {
 fetch(`https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Caccounts%7Bname%2Cinstagram_business_account%7Bname%2Cfollowers_count%2Cfollows_count%2Cmedia_count%2Cprofile_picture_url%7D%7D%2Cemail&access_token=${req.body.token}`, {
   headers: {
     'Content-Type': 'application/json; charset=utf-8',
   }
 }).then(response => response.json())
   .then(response => {
     User.findOneAndUpdate({facebookId: response.id}, {authToken: req.body.token, instagramAccounts: response.accounts.data})
       .then(result => {
         if(result) {
           console.log(`Updated ${result.name}'s auth token...`);
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
               console.log('New user made');
               res.json({success: true, message: "New User Created!"})
             })
             .catch(error => {
               console.log('Could not create new user: ', error);
               res.json({success: false, message: "Could not create new user!", error: error})
             })
         }
       })
   })
   .catch(error => {
     console.log("Could not connect to Facebook... ", error);
     res.json({success: false, message: "Could not connect to Facebook", error: error})
   })
});



app.use((req, res, next) => {
  let token = req.get('facebookAuthToken');
  User.findOne({authToken: token})
    .then(response => {
      if(response) {
        req.user = response;
        next();
      } else {
        console.log('Invalid user!');
        res.json({success: false, message: "User not authenticated!"})
      }
    })
    .catch(error => {
      console.log('Error verifying user');
      res.json({success: false, message: "Unable to verify user...", error: error})
    })
});

app.listen(process.env.PORT || 1337, () => console.log('Example app listening on port 1337!'));


