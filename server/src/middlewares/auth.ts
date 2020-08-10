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
    return res.json({ error: "Nenhum token providenciado!" }).status(400);
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = (await jwt.verify(token, "secret")) as DecodedSession;

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.json({ error: error.message }).status(400);
  }
}
