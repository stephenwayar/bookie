import mongoose from "mongoose";
import Book from "@/backend/models/Book";
import Review from "@/backend/models/Review";
import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/backend/types/response.types";
import { extractAndValidateToken } from "@/backend/middlewares/extractAndValidateToken";

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>
) {
  await connectToDatabase();

  try {
    const { id } = req.query;

    const reviews = await Review.find({ book: id }).populate('user')

    res.status(200).json(reviews);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>
) {
  await connectToDatabase();

  try {
    const decryptedToken = await extractAndValidateToken(req, res);

    if (!decryptedToken) return;

    const { id } = req.query;
    const { review } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const userId = decryptedToken.id;

    const newReview = new Review({
      user: userId,
      book: id,
      review,
    });

    await newReview.save();

    // Push the new rating into the book's ratings array
    book.reviews.push(newReview._id as mongoose.Schema.Types.ObjectId);

    await book.save();

    // Find the updated book by its ID after saving, and populate the ratings
    const addedReview = await Review.findById(newReview._id).populate('user')

    res.status(200).json(addedReview);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse>,
) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    case "POST":
      return await POST(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}