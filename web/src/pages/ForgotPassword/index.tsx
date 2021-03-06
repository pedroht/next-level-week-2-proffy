import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import FormLayout from "../../components/FormLayout";
import Input from "../../components/Input";

import "./styles.css";

function ForgotPassword() {
  const history = useHistory();

  const [email, setEmail] = useState("");

  async function handleForgotPassword(e: FormEvent) {
    e.preventDefault();

    history.push("/status");
  }

  return (
    <FormLayout>
      <form onSubmit={handleForgotPassword}>
        <h1>Eita, esqueceu sua senha?</h1>
        <p>Não esquenta, vamos dar um jeito nisso</p>

        <Input
          type="email"
          name="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={email === "" ? true : false}>
          Enviar
        </button>
      </form>
    </FormLayout>
  );
}

export default ForgotPassword;
