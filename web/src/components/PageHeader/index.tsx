import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";

interface PageHeaderProps {
  page: string;
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  page,
  title,
  description,
  children,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/" className="">
          <img src={backIcon} alt="Voltar" />
        </Link>

        <p>{page}</p>

        <img src={logoImg} alt="Logo Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
