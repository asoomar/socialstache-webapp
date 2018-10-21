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

//THINGS TO FINISH SET UP
//CONNECT TO MONGODB WITH MLAB
//CREATE ENV.SH TO STORE MONGODB_URI
//FINISH SET UP WITH MONGODB

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
//   .catch((err) => { console.log(err); });
//
// app.use(session({
//   secret: 'mysecretisthisrandomstringofletters',
//   store: new MongoStore({ mongooseConnection: mongoose.connection }),
// }));
//
// app.get('/test', (req, res) => {
//   res.send('It works');
// });

