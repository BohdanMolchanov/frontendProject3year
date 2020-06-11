import React, { Fragment } from "react";
import { Input, EmployeeBlock } from "@/_func_components/";
import { authenticationService, userService } from "@/_services";

class RegisterEmployee extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    secondName: "",
    employeesList: "",
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
      .registerEmployee(email, password, firstName, lastName, secondName)
      .then(
        (message) => {
          this.setState({ status: message.message });
          window.location.reload(false);
        },
        (error) => this.setState({ status: error.message })
      );
    console.log(this.state);
  };

  componentWillMount() {
    userService.getAll().then((response) => {
      this.setState({
        employeesList: response,
      });
    });
  }

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
      employeesList,
    } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.sendRegister}>
          {status && <p>{status}</p>}
          <div className="owner-register">
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
          <button type="submit">Зареєструвати співробітника</button>
        </form>
        {employeesList && (
          <div className="employees-list">
            {employeesList.map((item) => (
              <EmployeeBlock
                key={item.id}
                id={item.id}
                fname={item.firstName}
                sname={item.secondName}
                lname={item.lastName}
                role={item.employeeType}
              />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

export { RegisterEmployee };
