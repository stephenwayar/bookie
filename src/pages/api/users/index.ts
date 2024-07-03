import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/backend/types/res.types";
import User from "@/backend/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>,
) {
  await connectToDatabase();

  try {
    const user = await User.find()

    return res.status(200).json(user);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}