import axios from 'axios';
import fetch from'node-fetch'
import User from "../models/User";

export const getPageId = (token) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://graph.facebook.com/v3.1/me/accounts?fields=instagram_business_account%2Cname&access_token=${token}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }).then(result => {
      if(result.data.data.length > 0){
        resolve({success: true, response: result.data.data})
      } else {
        reject({error: 'No pages found'})
      }
    }).catch(err => reject({error: 'An error occurred'}))
  })
};