import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/backend/types/res.types";
import { extractAndValidateToken } from "@/backend/middlewares/extractAndValidateToken";
import Book from "@/backend/models/Book";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>,
) {
  await connectToDatabase();

  try {
    const decryptedToken = await extractAndValidateToken(req, res);

    if (!decryptedToken) return

    const books = await Book.find({ author: decryptedToken.id }).populate('author')

    return res.status(200).json(books);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}