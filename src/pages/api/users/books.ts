import Book from "@/backend/models/Book";
import connectToDatabase from "@/backend/config/mongoose";
import { ErrorResponse } from "@/backend/types/response.types";
import type { NextApiRequest, NextApiResponse } from "next";
import { extractAndValidateToken } from "@/backend/middlewares/extractAndValidateToken";

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