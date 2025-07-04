import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/backend/models/User";
import { ENCRYPTION_KEY } from "@/config/env";
import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorResponse, LoginDataResponse } from "@/backend/types/response.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | LoginDataResponse>,
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

    const token = jwt.sign(userForToken, ENCRYPTION_KEY, { expiresIn: '1d' });

    res.status(200).send({
      id: user._id as string,
      email: user.email,
      access_token: token,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}