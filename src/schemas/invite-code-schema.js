import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const inviteCodeSchema = new Schema({
  inviteId: {
    type: Number,
    required: true,
    immutable: true
  },
  code: {
    type: String,
    required: true,
    immutable: true
  },
  source: {
    type: String,
    enum: ['april-2023-invite-cards'],
    required: true
  },
  expires: {
    type: Date,
    required: false,
    default: () => Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date(new Date().getFullYear() + 1, 0, 1)) // January 1, 2024
  },
  used: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date())
  }
}, { collection: 'inviteCodes' });

const InviteCode = model('inviteCode', inviteCodeSchema);

export default InviteCode;
