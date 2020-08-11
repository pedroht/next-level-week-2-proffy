import React, { useState, useEffect, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import Avatar from "../../components/Avatar";

import warningIcon from "../../assets/images/icons/warning.svg";

import api from "../../services/api";

import "./styles.css";

function TeacherForm() {
  const history = useHistory();

  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [token, setToken] = useState<null | string>();
  const [options, setOptions] = useState([]);

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("@Proffy:Token");

    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    async function loadSubjects() {
      const response = await api.get("subjects");

      setOptions(response.data);
    }

    loadSubjects();
  }, []);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    const response = await api.put(
      "users",
      {
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data === "Created") {
      alert("Cadastro realizado com sucesso!");

      history.push("/");
    } else {
      alert("Erro no cadastro. Erro: " + response.data.error);
    }
  }

  function setScheduleItemValue(
    position: Number,
    field: String,
    value: String
  ) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [`${field}`]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        page="Dar Aulas"
        title="Que incrível que você quer dar aulas."
        description="O primeiro é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="form-group">
              <Avatar
                image="https://github.com/diego3g.png"
                name="Pedro"
                lastname="Henrique"
              />

              <Input
                label="WhatsApp"
                name="whatsapp"
                value={whatsapp}
                placeholder="(   )   _   ____-____"
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <Textarea
              label="Biografia"
              labelOptions="(Máximo 300 caracteres)"
              name="bio"
              maxLength={300}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <div className="form-group">
              <Select
                label="Matéria"
                name="subject"
                options={[
                  { value: "Artes", label: "Artes" },
                  { value: "Química", label: "Química" },
                  { value: "Matemática", label: "Matemática" },
                  { value: "Português", label: "Português" },
                  { value: "Biologia", label: "Biologia" },
                  { value: "Ciências", label: "Ciências" },
                  { value: "Geografia", label: "Geografia" },
                  { value: "História", label: "História" },
                  { value: "Educação Física", label: "Educação Física" },
                ]}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Input
                label="Custo da sua hora por aula"
                name="cost"
                placeholder="R$"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={index}>
                <Select
                  label="Dia da semana"
                  name="week_day"
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, "week_day", e.target.value)
                  }
                  options={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-feira" },
                    { value: "2", label: "Terça-feira" },
                    { value: "3", label: "Quarta-feira" },
                    { value: "4", label: "Quinta-feira" },
                    { value: "5", label: "Sexta-feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />
                <Input
                  label="Das"
                  name="from"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, "from", e.target.value)
                  }
                />
                <Input
                  label="Até"
                  name="to"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, "to", e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
