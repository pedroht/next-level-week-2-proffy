import React, { useState, FormEvent, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import api from "../../services/api";

import FormLayout from "../../components/FormLayout";

import purpleHeartImg from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("@Proffy:Token");

    if (user) {
      history.push("landing");
    }
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const response = await api.post("login", { email, password });

    const { token } = response.data;

    localStorage.setItem("@Proffy:Token", token);

    //history.push("landing");
  }

  return (
    <FormLayout login>
      <form onSubmit={handleLogin}>
        <h1>Fazer login</h1>

        <div className="input-block">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="E-mail"
          />
        </div>
        <div className="input-block">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Senha"
          />
        </div>

        <div className="form-group">
          <div className="input-group">
            <input type="checkbox" id="remind-me" />
            <label htmlFor="remind-me">Lembrar-me</label>
          </div>
          <Link to="/forgot-password">Esqueci minha senha</Link>
        </div>

        <button
          type="submit"
          disabled={email === "" || password === "" ? true : false}
        >
          Entrar
        </button>
      </form>

      <div className="register">
        <p>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
        <p className="free">
          É de graça <img src={purpleHeartImg} alt="Heart" />
        </p>
      </div>
    </FormLayout>
  );
}

export default Login;
