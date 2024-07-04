import type { User as UserType } from '../types/model.types';
import mongoose, { Schema, Document, Model } from 'mongoose';

const UserSchema: Schema<UserType> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  readingList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
});

UserSchema.set('toJSON', {
  transform: function (
    doc: Document<any, any, any>,
    ret: Record<string, any>,
    _options: mongoose.ToObjectOptions
  ) {
    const { password, ...object } = ret;
    delete object.password;

    return object;
  }
});

const User: Model<UserType> = mongoose.models.User || mongoose.model<UserType>('User', UserSchema);

export default User;