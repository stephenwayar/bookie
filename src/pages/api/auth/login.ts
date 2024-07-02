import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/backend/models/user";
import { ENCRYPTION_KEY } from "@/config/env";
import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type ErrorResponse = {
  success: boolean;
  message: string
}

type DataResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  access_token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | DataResponse>,
) {
  await connectToDatabase();

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist in our records",
      });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const userForToken = {
      id: user._id,
      email: user.email
    };

    if (!ENCRYPTION_KEY) {
      console.log('SECRET environment variable is not defined');

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    const token = jwt.sign(userForToken, ENCRYPTION_KEY, { expiresIn: '1d' });

    res.status(200).send({
      id: user._id as string,
      email: user.email,
      access_token: token,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    });
  } catch (error){
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}