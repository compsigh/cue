import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    immutable: true
  },
  cues: [{
    id: {
      type: Number,
      required: true,
      immutable: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: false
    },
  }],
  invitesRemaining: {
    type: Number,
    required: true,
    default: 1
  },
  createdOn: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date())
  }
}, { collection: 'users' });

const User = mongoose.models.User || model('User', userSchema);

export default User;
