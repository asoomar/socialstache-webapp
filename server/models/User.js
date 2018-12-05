import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  facebookId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  facebookToken: {
    type: String,
    required: true,
  },
  instagramAccounts: {
    type: Array,
    required: true
  }
});

export default mongoose.model('User', UserSchema);