import jwt from "jsonwebtoken";
import { ENCRYPTION_KEY } from "@/config/env";
import { NextApiRequest, NextApiResponse } from "next";
import { DecryptedToken, ErrorResponse } from "../types/res.types";

export async function extractAndValidateToken(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse>
): Promise<DecryptedToken | void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!ENCRYPTION_KEY) {
      throw new Error("Encryption key is not defined");
    }

    const decryptedToken = jwt.verify(token, ENCRYPTION_KEY) as DecryptedToken;

    return decryptedToken;
  } catch (error) {
    console.error("Token validation error:", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    })
  }
}