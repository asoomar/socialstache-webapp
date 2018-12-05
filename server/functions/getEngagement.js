import axios from 'axios';
import fetch from'node-fetch'
import User from "../models/User";

const getEngagement = (posts) => {
  let recent = posts.slice(0, 15);
  let like_total = 0;
  let comment_total = 0;
  recent.forEach(post => {
    like_total += post.like_count;
    comment_total += post.comments_count;
  });
  return {
    likeAvg: like_total/15,
    commentAvg: comment_total/15,
    engagementAvg: (like_total + comment_total)/15,
  }
};