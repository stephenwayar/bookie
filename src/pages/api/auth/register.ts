import bcrypt from "bcryptjs";
import User from "@/backend/models/user";
import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/backend/types/res.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse>,
) {
  await connectToDatabase();

  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "There is a user with this email already",
      });
    }

    const newUser = new User({ firstName, lastName, email, phoneNumber, password });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashedPassword;

    await newUser.save();

    res.status(201).end();
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}