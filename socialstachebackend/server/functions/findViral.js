import axios from 'axios';
import fetch from'node-fetch'
import User from "../models/User";

export const findViral = (token, user, id) => {
  return new Promise((resolve, reject) => {
    axios.get( `https://graph.facebook.com/v3.1/${id}?fields=business_discovery.username(${user})%7Bmedia.limit(200)%7Bmedia_url%2Clike_count%2Ccomments_count%2Ccaption%2Ctimestamp%7D%7D&access_token=${token}`,{
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }).then(result => {
      console.log('Response obtained!');
      let posts = result.data.business_discovery.media.data;
      let viral = sortPosts(posts);
      let engagement = getEngagement(posts);
      resolve({success: true, response: viral, engagement: engagement})
    }).catch(error => {
      console.log('Caught error!');
      reject({error: error});
    });
  })
};