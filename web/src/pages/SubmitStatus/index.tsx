import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import successCheckIcon from "../../assets/images/icons/success-check-icon.svg";
import successBgImg from "../../assets/images/success-background.svg";

import "./styles.css";

interface StateProps {
  page: string;
}

function SubmitStatus() {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState<string[]>([]);

  useEffect(() => {
    const { page } = history.location.state as StateProps;

    if (page === "register") {
      setTitle("Cadastro Concluído");
      setSubtitle([
        "Agora você faz parte da plataforma da Proffy.",
        "Tenha uma ótima experiência.",
      ]);
    }
  }, []);

  return (
    <div id="submit-status" style={{ backgroundImage: `url(${successBgImg})` }}>
      <div className="status-icon">
        <img src={successCheckIcon} alt="Sucesso" />
      </div>
      <h1>{title}</h1>

      <p>
        {subtitle[0]}
        {subtitle.length > 1 ? <br /> : ""}
        {subtitle[1]}
      </p>

      <Link to="/">Fazer Login</Link>
    </div>
  );
}

export default SubmitStatus;
