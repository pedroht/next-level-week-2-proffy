import { Request, Response, response } from "express";
import bcrypt from "bcrypt";

import db from "../database/connection";

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
    const { email } = req.body;
    const { id } = req.params;

    const user_id = req.userId;

    try {
      if (user_id === Number(id)) {
        let user = await db("users").where("id", id);

        if (email !== typeof undefined && email !== user[0].email) {
          user = await db("users").where("email", email);

          if (user[0]) {
            return res
              .json({ error: "Este email já está em uso " })
              .status(400);
          }
        }

        await db("users").update(req.body).where("id", id);

        return res.sendStatus(200);
      }

      return res.json({ error: "Usuário Não autorizado" }).status(400);
    } catch (error) {
      return res.json({ error: error.message }).status(400);
    }
  }
}
