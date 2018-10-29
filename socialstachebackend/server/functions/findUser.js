import axios from 'axios';
import fetch from'node-fetch'
import User from "../models/User";

export const findUser = (token, user, id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://graph.facebook.com/v3.1/${id}?fields=business_discovery.username(${user})%7Busername%2Cprofile_picture_url%2Cfollowers_count%2Cmedia_count%2Cfollows_count%7D&access_token=${token}`,{
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }).then(result => {
      console.log('Response obtained!');
      resolve({success: true, response: result.data.business_discovery})
    }).catch(error => {
      console.log('Caught error!');
      reject({error: error});
    });
  })
};
