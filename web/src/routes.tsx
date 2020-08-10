import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";

import Landing from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SubmitStatus from "./pages/SubmitStatus";
import User from "./pages/User";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/landing" component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/status" component={SubmitStatus} />
      <Route path="/user" component={User} />
    </BrowserRouter>
  );
}

export default Routes;
