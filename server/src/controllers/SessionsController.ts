import { Request, Response, response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../database/connection";

export default class UsersController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await db("users").where("email", "=", email);

      if (!user[0]) {
        return res.json({ error: "Usuário não encontrado" }).status(400);
      }

      const compareHash = await bcrypt.compare(password, user[0].password);

      if (!compareHash) {
        return res.json({ error: "Senha incorreta" }).status(400);
      }

      return res.status(200).json({
        user,
        token: jwt.sign({ id: user[0].id }, "secret", { expiresIn: 2400 }),
      });
    } catch (error) {
      return res
        .json({
          error: "Autenticação do usuário falhou",
        })
        .status(400);
    }
  }

  async logout(req: Request, res: Response) {
    req.userId = null;

    return res.sendStatus(200);
  }
}
