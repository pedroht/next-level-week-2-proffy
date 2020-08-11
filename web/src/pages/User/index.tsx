import React, { useState, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import Avatar from "../../components/Avatar";

import warningIcon from "../../assets/images/icons/warning.svg";

import api from "../../services/api";

import convertMinutesToHourString from "../../utils/convertMinutesToHourString";

import "./styles.css";
import { userInfo } from "os";

interface User {
  name: string;
  lastname: string;
  email: string;
  whatsapp: string;
  bio: string;
  avatar: string;
}

interface ScheduleItem {
  id: null | number;
  week_day: number;
  from: string;
  to: string;
}

function User() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [token, setToken] = useState<null | string>();

  const [options, setOptions] = useState([]);

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

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

  useEffect(() => {
    async function loadUser() {
      const response = await api.get("users", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        console.log(response.data.error);
      }

      const { user, classes } = response.data;

      if (user) {
        setName(user.name);
        setLastname(user.lastname);
        setAvatar(user.avatar);
        setEmail(user.email);
        setWhatsapp(user.whatsapp);
        setBio(user.bio);
      }

      if (classes) {
        setSubject(classes[0].subject_id);
        setCost(classes[0].cost);
        const filteredClasses = classes.map(
          ({ id, week_day, from, to }: ScheduleItem) => ({
            id,
            week_day,
            from: convertMinutesToHourString(Number(from)),
            to: convertMinutesToHourString(Number(to)),
          })
        );

        setScheduleItems(filteredClasses);
      }
    }

    loadUser();
  }, [token]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        id: null,
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    const response = await api.put(
      "users",
      {
        name,
        lastname,
        email,
        avatar,
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

    console.log(response.data);
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
    <div id="page-user-form" className="container">
      <PageHeader page="Dar aulas" title="Pedro Henrique">
        <Avatar
          image={avatar ? avatar : "https://github.com/diego3g.png"}
          name={name}
          lastname={lastname}
        />
        <p>Geografia</p>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateUser}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="form-group">
              <Input
                label="Nome"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Sobrenome"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <Input
                label="E-mail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                options={options}
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
              <div className="schedule-item" key={String(scheduleItem.id)}>
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

export default User;
