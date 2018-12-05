
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pageId: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  instaId: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Page', PageSchema);