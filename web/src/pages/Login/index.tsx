import React, { useState, FormEvent, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import api from "../../services/api";

import FormLayout from "../../components/FormLayout";
import Input from "../../components/Input";

import purpleHeartImg from "../../assets/images/icons/purple-heart.svg";
import vectorIcon from "../../assets/images/icons/vector.svg";

import "./styles.css";

interface LoginResponse {
  error?: string | undefined;
  token?: string;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remind, setRemind] = useState(false);
  const [error, setError] = useState<string | undefined>();

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

    const { error, token } = response.data as LoginResponse;

    console.log(error, token);

    if (token) {
      localStorage.setItem("@Proffy:Token", token);

      history.push("landing");
    }

    if (error) {
      setError(error);
    }
  }

  return (
    <FormLayout login error={error}>
      <form onSubmit={handleLogin}>
        <h1>Fazer login</h1>

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="E-mail"
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Senha"
        />

        <div className="form-group">
          <div className="remind-me">
            <button
              type="button"
              id="remind-me"
              className={remind ? "active" : ""}
              onClick={() => setRemind(!remind)}
            >
              {remind && <img src={vectorIcon} alt="Lembrar-me" />}
            </button>
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
