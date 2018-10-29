import axios from 'axios';
import fetch from'node-fetch'
import User from "../models/User";

const sortPosts = (posts) => {
  if(posts.length < 21){
    return [];
  }
  let sum = 0;
  for (let i = 0; i < 21; i++) {
    sum += posts[i].like_count + posts[i].comments_count;
  }
  let averageArray = [];
  for(let i = 0; i < 10; i++) {
    averageArray.push(sum);
  }
  for (let i = 10; i < posts.length - 10; i++) {
    sum = sum - posts[i-10].like_count - posts[i-10].comments_count + posts[i+10].like_count + posts[i+10].comments_count;
    averageArray.push(sum);
  }
  for(let i = posts.length - 10; i < posts.length; i++){
    averageArray.push(sum);
  }
  console.log('Number of posts: ', posts.length);
  console.log('Number of averageArray: ', averageArray.length);

  let viralPosts = posts.map((post, index) => {
    let averageRate = averageArray[index]/21;
    post.relativeEngRate = (post.like_count + post.comments_count)/averageRate;
    return post;
  });
  console.log('Filtering posts for virals only');
  viralPosts = viralPosts.filter(post => {
    return post.relativeEngRate > 1.5;
  });

  viralPosts.sort((a, b) => {
    return b.relativeEngRate - a.relativeEngRate;
  });

  return viralPosts;
};