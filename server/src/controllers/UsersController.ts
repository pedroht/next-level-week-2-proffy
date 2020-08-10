import { Request, Response, response } from "express";
import bcrypt from "bcrypt";

import ClassesController from "./ClassesController";

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class UsersController {
  async show(req: Request, res: Response) {
    const id = req.userId;

    try {
      const user = await db("users")
        .select("name", "lastname", "email", "avatar", "bio", "whatsapp")
        .where("id", Number(id));

      return res.status(200).json({ user });
    } catch (error) {
      return res.json({ error: error.message }).status(400);
    }
  }

  async create(req: Request, res: Response) {
    const { name, lastname, email, password } = req.body;

    try {
      const user = await db("users").where("email", email);

      if (!user[0]) {
        const newPassword = await bcrypt.hash(password, 8);

        await db("users").insert({
          name,
          lastname,
          email,
          password: newPassword,
        });

        return res.sendStatus(201);
      }

      return res.json({ error: "Usuário já existe!" }).status(400);
    } catch (error) {
      return res
        .json({
          error: "Usuário não pode ser registrado",
          message: error.message,
        })
        .status(400);
    }
  }

  async update(req: Request, res: Response) {
    const { email, cost, schedule, subject } = req.body;

    delete req.body.subject;
    delete req.body.cost;
    delete req.body.schedule;

    const user_id = req.userId as number;

    try {
      let user = await db("users").where("id", user_id);

      if (email !== typeof undefined && email !== user[0].email) {
        user = await db("users").where("email", email);

        if (user[0]) {
          return res.json({ error: "Este email já está em uso " }).status(400);
        }
      }

      await db("users").update(req.body).where("id", user_id);

      const classController = new ClassesController();

      req.body.subject = subject;
      req.body.cost = cost;
      req.body.schedule = schedule;

      classController.create(req, res);

      return res.sendStatus(201);
    } catch (error) {
      return res.json({ error: error.message }).status(400);
    }
  }
}
