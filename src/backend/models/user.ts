import { User } from '../types/model.types';
import mongoose, { Schema, Document, Model } from 'mongoose';

const UserSchema: Schema<User> = new Schema({
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
});

UserSchema.set('toJSON', {
  transform: function (
    doc: Document<any, any, any>,
    ret: Record<string, any>,
    _options: mongoose.ToObjectOptions
  ) {
    const { __v, password, ...object } = ret;
    delete object.__v;
    delete object.password;

    return object;
  }
});

const User: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default User;