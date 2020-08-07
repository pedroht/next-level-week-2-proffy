import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";

interface DecodedSession {
  id: number;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.status(400).json({ error: "Nenhum token providenciado!" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = (await jwt.verify(token, "secret")) as DecodedSession;

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
