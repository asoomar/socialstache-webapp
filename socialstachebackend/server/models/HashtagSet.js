
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HashtagSetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  hashtags: {
    type: Array,
    required: true,
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model('HashtagSet', HashtagSetSchema);