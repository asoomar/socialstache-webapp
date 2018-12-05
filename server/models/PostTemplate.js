
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostTemplateSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: false,
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model('PostTemplate', PostTemplateSchema);