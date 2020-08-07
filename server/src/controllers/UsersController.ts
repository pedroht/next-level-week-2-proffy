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
      return res.status(400).json({ error: error.message });
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

      return res.status(400).json({ error: "Usuário já existe!" });
    } catch (error) {
      return res.status(400).json({
        error: "Usuário não pode ser registrado",
        message: error.message,
      });
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
              .status(400)
              .json({ error: "Este email já está em uso " });
          }
        }

        await db("users").update(req.body).where("id", id);

        return res.sendStatus(200);
      }

      return res.status(400).json({ error: "Usuário Não autorizado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
