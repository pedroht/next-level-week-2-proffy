import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import logoutIcon from "../../assets/images/icons/logout.svg";

import api from "../../services/api";

import "./styles.css";
import Avatar from "../../components/Avatar";

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem("@Proffy:Token");
    history.push("/");
  }

  useEffect(() => {
    async function getTotalConnections() {
      const response = await api.get("connections");

      setTotalConnections(response.data.total);
    }

    getTotalConnections();
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="user-actions">
          <Avatar
            name="Pedro"
            lastname="Henrique"
            image="https://avatars2.githubusercontent.com/u/2254731?v=4"
            home
          />
          <button onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout" />
          </button>
        </div>

        <div className="banner">
          <div className="logo-container">
            <img src={logoImg} alt="Logo Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </div>

        <div className="actions">
          <div className="welcome">
            <p>
              Seja bem-vindo
              <span>O que deseja fazer?</span>
            </p>

            <span className="total-connections">
              Total de {totalConnections} conexões já realizadas{" "}
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>
          </div>

          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Dar aulas" />
              Dar aulas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
