import User from "@/backend/models/User";
import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorResponse } from "@/backend/types/response.types";
import { extractAndValidateToken } from "@/backend/middlewares/extractAndValidateToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>
) {
  await connectToDatabase();

  try {
    const decryptedToken = await extractAndValidateToken(req, res);

    if (!decryptedToken) return;

    const { bookId } = req.body;
    const userId = decryptedToken.id;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if the bookId exists in the user's readingList
    const bookIndex = user.readingList.findIndex((id: any) => id.toString() === bookId);

    if (bookIndex >= 0) {
      // If the bookId exists, remove it from the readingList
      user.readingList.splice(bookIndex, 1);
    } else {
      // If the bookId does not exist, add it to the readingList
      user.readingList.push(bookId as any);
    }

    // Save the updated user document
    await user.save();

    // Return the updated user document
    res.status(200).json(user);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}