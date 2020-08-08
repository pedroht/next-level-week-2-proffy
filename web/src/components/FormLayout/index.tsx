import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import proffyBgImg from "../../assets/images/proffy-background.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";

interface LayoutProps {
  login?: boolean;
  children: ReactNode;
  error?: string | undefined;
}

const FormLayout: React.FC<LayoutProps> = ({ login, error, children }) => {
  return (
    <div id="page-form">
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${proffyBgImg})`,
        }}
      >
        <div className="proffy-container">
          <img src={logoImg} alt="Proffy" />
          <p>Sua plataforma de estudos online.</p>
        </div>
      </div>

      <div className="form-container">
        {!login && (
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        )}

        {error && <div className="error">{error}</div>}

        {children}
      </div>
    </div>
  );
};

export default FormLayout;
