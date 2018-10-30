import axios from 'axios';
import fetch from'node-fetch'
import User from "../models/User";

export const loginOrSignUp = (response) => {
  return new Promise((resolve, reject) => {
      if(result) {
        console.log('Updated User Auth Token!');
        resolve({success: true, message: "Updated User Auth Token!"})
        //res.json({success: true, message: "Updated User Auth Token!"})
      } else {
        const newUser = new User({
          username: response.email,
          firstName: response.first_name,
          lastName: response.last_name,
          password: response.id,
          accounts: response.accounts.data,
          authToken: req.body.token
        });
        newUser.save()
          .then(response => {
            console.log('New user made');
            resolve({success: true, message: "New User Created!"})
            //res.json({success: true, message: "New User Created!"})
          })
          .catch(error => {
            console.log('Could not create new user: ', error);
            //res.json({success: true, message: "Could not create new user!"})
            reject({success: false, message: "Could not create new user!"})
          })
      }
    }
  )};