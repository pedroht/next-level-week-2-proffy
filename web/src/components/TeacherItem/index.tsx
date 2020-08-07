import React from "react";

import whatsappicon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Teacher {
  id: number;
  avatar: string;
  name: string;
  bio: string;
  cost: number;
  subject: string;
  user_id: number;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  async function handleCreateConnection(user_id: number, whatsapp: string) {
    api
      .post("connections", { user_id })
      .then(() => {
        window.open(`https://wa.me/+55${whatsapp}`, "_blank");
      })
      .catch(() => alert("Ocorreu algum erro!"));
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>
            {teacher.cost === 0
              ? "Grátis"
              : Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(teacher.cost)}
          </strong>
        </p>
        <button
          type="button"
          onClick={() =>
            handleCreateConnection(teacher.user_id, teacher.whatsapp)
          }
        >
          <img src={whatsappicon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
