import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import ms from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';
import fetch from "node-fetch";

const MongoStore = ms(session);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .catch((err) => { console.log(err); });

app.use(session({
  secret: 'mysecretisthisrandomstringofletters',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


app.get('/test', (req, res) => {
  res.send('It works');
});

app.listen(process.env.PORT || 1337, () => console.log('Example app listening on port 1337!'));


