import React, { Fragment } from "react";
import { Input } from "@/_func_components/Input";
import { authenticationService, organizationService } from "@/_services";
class RegisterOrganizationPage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    currentUser: authenticationService.currentUserValue,
    inputName: "",
    inputEdrpou: "",
    status: "",
  };
  handleChange = () => {
    this.setState({
      inputName: this.nameRef.current.value,
      inputEdrpou: this.edrpouRef.current.value,
    });
  };
  sendOrganization = (e) => {
    e.preventDefault();
    const { inputName, inputEdrpou } = this.state;
    organizationService.register(inputName, inputEdrpou).then(
      (message) => {
        authenticationService.logout();
        this.props.history.push("/");
      },
      (error) => this.setState({ status: error })
    );
  };

  nameRef = React.createRef();
  edrpouRef = React.createRef();
  render() {
    const { currentUser, inputName, inputEdrpou, status } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.sendOrganization}>
          {status && <p>{status}</p>}
          <div className="form-row">
            <Input
              type="text"
              text="Назва організації"
              reference={this.nameRef}
              value={inputName}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              text="Код ЄДРПОУ"
              reference={this.edrpouRef}
              value={inputEdrpou}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Зареєструвати заклад</button>
        </form>
      </Fragment>
    );
  }
}
export { RegisterOrganizationPage };
