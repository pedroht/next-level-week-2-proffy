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
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      const compareHash = await bcrypt.compare(password, user[0].password);

      if (!compareHash) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      return res.status(200).json({
        user,
        token: jwt.sign({ id: user[0].id }, "secret", { expiresIn: 2400 }),
      });
    } catch (error) {
      return res.status(400).json({
        error: "Autenticação do usuário falhou",
      });
    }
  }

  async logout(req: Request, res: Response) {
    req.userId = null;

    return res.status(200).json({ message: "Logout" });
  }
}
