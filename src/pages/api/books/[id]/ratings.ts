import mongoose from "mongoose";
import Book from "@/backend/models/Book";
import Rating from "@/backend/models/Rating";
import connectToDatabase from "@/backend/config/mongoose";
import { ErrorResponse } from "@/backend/types/response.types";
import type { NextApiRequest, NextApiResponse } from "next";
import { extractAndValidateToken } from "@/backend/middlewares/extractAndValidateToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>
) {
  await connectToDatabase();

  try {
    const decryptedToken = await extractAndValidateToken(req, res);

    if (!decryptedToken) return;

    const { id } = req.query;
    const { rating } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const userId = decryptedToken.id;

    // Find an existing rating by the user for the book
    const existingRating = await Rating.findOne({ user: userId, book: id });

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      // Create a new rating
      const newRating = new Rating({
        user: userId,
        book: id,
        rating,
      });

      await newRating.save();

      // Push the new rating into the book's ratings array
      book.ratings.push(newRating._id as mongoose.Schema.Types.ObjectId);
    }

    await book.save();

    // Find the updated book by its ID after saving, and populate the ratings
    const updatedBook = await Book.findById(book._id)
      .populate('author')
      .populate({
        path: 'ratings',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          model: 'User'
        }
      });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}