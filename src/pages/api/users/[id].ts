import User from "@/backend/models/User";
import connectToDatabase from "@/backend/config/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/backend/types/response.types";
import { extractAndValidateToken } from "@/backend/middlewares/extractAndValidateToken";

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>,
) {
  await connectToDatabase();

  try {
    const { id } = req.query;

    const user = await User.findById(id)
      .populate({
        path: 'books',
        populate: {
          path: 'author',
          model: 'User',
        },
      })
      .populate({
        path: 'readingList',
        populate: {
          path: 'author',
          model: 'User',
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function PUT(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>,
) {
  await connectToDatabase();

  try {
    const decryptedToken = await extractAndValidateToken(req, res);

    if (!decryptedToken) return

    const { id } = req.query;
    const { firstName, lastName, phoneNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { firstName, lastName, phoneNumber } },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any>,
) {
  await connectToDatabase();

  try {
    const decryptedToken = await extractAndValidateToken(req, res);

    if (!decryptedToken) return

    const { id } = req.query;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).end()
  } catch (error) {
    console.log('Internal server error ', error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
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
    case "PUT":
      return await PUT(req, res);
    case "DELETE":
      return await DELETE(req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}