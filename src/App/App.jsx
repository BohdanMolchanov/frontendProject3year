import React, { Fragment } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";

import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { HomePage } from "@/PageComponents/HomePage";
import { LoginPage } from "@/PageComponents/LoginPage";
import { ContactsPage } from "@/PageComponents/ContactsPage";
import {
  RegisterPage,
  RegisterOrganizationPage,
  RegisterEmployee,
} from "@/PageComponents/RegisterPage";
import { AddCure } from "@/Cures";
import { CurePage, Footer, NavBar, PrivateRoute } from "@/_components";
import { Header } from "../_components/Header";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      error: false,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x,
      })
    );
  }
  componentDidCatch() {
    this.state.error = true;
  }

  render() {
    const { currentUser, error } = this.state;
    console.log(currentUser);
    return (
      <Router history={history}>
        <Fragment>
          <NavBar currentUser={currentUser} />
          <Header />
          <main>
            {error && <h1>{error}</h1>}
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/contacts" component={ContactsPage} />
              <Route exact path="/register" component={RegisterPage} />
              <PrivateRoute
                path="/registerorganization"
                roles={[Role.Owner]}
                component={RegisterOrganizationPage}
              />
              <PrivateRoute
                path="/registeremployee"
                roles={[Role.Owner]}
                component={RegisterEmployee}
              />
              <PrivateRoute
                path="/addcure"
                roles={[Role.Pharmacist]}
                component={AddCure}
              />
              <Route path="/:id" component={CurePage} />
            </Switch>
          </main>
          <Footer currentUser={currentUser} />
        </Fragment>
      </Router>
    );
  }
}

export { App };
