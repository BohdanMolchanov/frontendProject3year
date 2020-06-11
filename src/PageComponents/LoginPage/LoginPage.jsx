import React, { Fragment } from "react";

import { authenticationService } from "@/_services";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }
  state = {
    inputUserName: "",
    inputPassword: "",
    status: "",
  };
  handleChange = () => {
    this.setState({
      inputUserName: this.usernameRef.current.value,
      inputPassword: this.passwordRef.current.value,
    });
  };
  sendLogin = (e) => {
    e.preventDefault();
    const { inputUserName, inputPassword } = this.state;
    authenticationService.login(inputUserName, inputPassword).then(
      (user) => {
        this.props.history.push("/");
      },
      (error) => {
        this.setState({
          status: error,
        });
      }
    );
  };

  usernameRef = React.createRef();
  passwordRef = React.createRef();
  //loginRef = React.createRef();
  render() {
    const { inputUserName, inputPassword, status } = this.state;

    return (
      <form onSubmit={this.sendLogin}>
        {status && <p>{status}</p>}
        <div className="form-row">
          <label className="input-label">
            <p className="label-p">Логін:</p>
            <input
              ref={this.usernameRef}
              type="text"
              name="username"
              onChange={this.handleChange}
              value={inputUserName}
            ></input>
          </label>

          <label className="input-label">
            <p className="label-p">Пароль:</p>
            <input
              ref={this.passwordRef}
              type="password"
              name="password"
              onChange={this.handleChange}
              value={inputPassword}
            ></input>
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    );
  }
}

export { LoginPage };
