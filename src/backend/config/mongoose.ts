/* eslint-disable no-var */
import mongoose, { Mongoose } from 'mongoose';
import Review from '../models/Review';
import Book from '../models/Book'; 
import User from '../models/User';
import { MONGODB_URI } from '@/config/env';
import Rating from '../models/Rating';

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

/*
 * Global is used here to maintain a cached 
 * connection across hot reloads in development. 
 * This prevents connections growing exponentially during API Route usage.
*/

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

// Create a cached connection variable if it doesn't exist
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

const cached = global.mongooseCache;

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      // Ensure models are registered
      mongoose.model('Book', Book.schema);
      mongoose.model('User', User.schema);
      mongoose.model('Rating', Rating.schema);
      mongoose.model('Review', Review.schema);

      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectToDatabase;