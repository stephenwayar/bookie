import Book from "@/backend/models/Book";
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

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Book ID is required',
      });
    }

    const book = await Book.findById(id)
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

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    return res.status(200).json(book);
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
    const { title, description } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Book ID is required',
      });
    }

    if (!title && !description) {
      return res.status(400).json({
        success: false,
        message: 'Title or description is required',
      });
    }

    const updatedFields: any = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).populate('author')
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

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    return res.status(200).json(updatedBook);
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

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Book ID is required',
      });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
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