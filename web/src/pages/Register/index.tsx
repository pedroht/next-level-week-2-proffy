import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import FormLayout from "../../components/FormLayout";

import "./styles.css";
import { Z_STREAM_ERROR } from "zlib";

function Register() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    const response = await api.post("users", {
      name,
      lastname,
      email,
      password,
    });

    if (response.data === "Created") {
      history.push("/status", { success: true, page: "register" });
    } else {
      setError(response.data.error);
    }
  }

  return (
    <FormLayout error={error}>
      <form onSubmit={handleRegister}>
        <h1>Cadastro</h1>
        <p>Preencha os dados abaixo para começar.</p>

        <div className="input-block">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-block">
          <input
            type="text"
            name="lastname"
            placeholder="Sobrenome"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="input-block">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-block">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Concluir cadastro</button>
      </form>
    </FormLayout>
  );
}

export default Register;
