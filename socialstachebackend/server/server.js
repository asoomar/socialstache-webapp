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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .catch((err) => { console.log(err); });

app.use(session({
  secret: 'mysecretisthisrandomstringofletters',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:1337/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'name']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      console.log('Finding user...');
      if(!user){
        console.log('User not found. Creating new user');
        const newUser = new User({
          facebookId: profile._json.id,
          name: profile._json.name,
          email: profile._json.email,
          facebookToken: accessToken,
          instagramAccounts: []
        });
        newUser.save(function(error, result) {
          return cb(error, result);
        })
      } else {
        console.log('User found');
        return cb(err, user);
      }
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook',
  passport.authenticate('facebook',
    { scope:
        [
        'email',
        'manage_pages',
        'instagram_basic',
        'instagram_manage_comments',
        'instagram_manage_insights',
        'pages_show_list',
        'read_insights',
        'leads_retrieval',
        'business_management',
        'read_audience_network_insights'
        ]
    })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/');
    res.send({success: true});
});


app.get('/test', (req, res) => {
  res.send('It works');
});

app.listen(process.env.PORT || 1337, () => console.log('Example app listening on port 1337!'));


