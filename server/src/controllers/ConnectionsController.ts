import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionController {
  async index(req: Request, res: Response) {
    try {
      const totalConnections = await db("connections").count("* as total");

      const { total } = totalConnections[0];

      return res.status(200).json({
        total,
      });
    } catch (error) {
      return res.json({ error: error.message }).status(400);
    }
  }

  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    try {
      await db("connections").insert({ user_id });

      return res.sendStatus(201);
    } catch (error) {
      return res.json({ error: error.message }).status(400);
    }
  }
}
