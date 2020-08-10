import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import FormLayout from "../../components/FormLayout";
import Input from "../../components/Input";

import "./styles.css";

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

        <Input
          name="name"
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          name="lastname"
          label="Sobrenome"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <Input
          type="email"
          name="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          name="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Concluir cadastro</button>
      </form>
    </FormLayout>
  );
}

export default Register;
