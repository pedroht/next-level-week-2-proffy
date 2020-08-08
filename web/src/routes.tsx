import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";

import Landing from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/study" exact component={TeacherList} />
      <Route path="/give-classes" exact component={TeacherForm} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
    </BrowserRouter>
  );
}

export default Routes;
