import React, { Fragment } from "react";

import { authenticationService } from "@/_services";
import { Input } from "@/_func_components/Input";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    secondName: "",
  };

  handleChange = () => {
    this.setState({
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      secondName: this.secondNameRef.current.value,
      status: "",
    });
  };

  sendRegister = (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, secondName } = this.state;
    authenticationService
      .registerOwner(email, password, firstName, lastName, secondName)
      .then(
        (message) => {
          this.props.history.push("/");
          console.log("hellso");
        },
        (error) => this.setState({ status: error })
      );
    console.log(this.state);
  };

  emailRef = React.createRef();
  passwordRef = React.createRef();
  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  secondNameRef = React.createRef();

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      secondName,
      status,
    } = this.state;
    return (
      <form onSubmit={this.sendRegister}>
        {status && <p>{status}</p>}
        <div>
          <div className="form-row">
            <Input
              type="email"
              text="Пошта"
              reference={this.emailRef}
              value={email}
              onChange={this.handleChange}
            />
            <Input
              type="password"
              text="Пароль"
              reference={this.passwordRef}
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              text="Ім'я"
              reference={this.firstNameRef}
              value={firstName}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              text="Прізвище"
              reference={this.lastNameRef}
              value={lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              text="По-батькові"
              reference={this.secondNameRef}
              value={secondName}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    );
  }
}

export { RegisterPage };
