import React, { Fragment } from "react";
import { cureService } from "@/_services";
import { Route, Redirect } from "react-router-dom";
import { OneCure } from "./OneCure";
import { history, Role } from "@/_helpers";

export class EditCureBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    count: "",
    cureId: this.props.id,
    status: this.props.status,
  };
  handleChange = () => {
    if (/^\d*$/.test(this.countRef.current.value))
      this.setState({
        count: this.countRef.current.value,
      });
  };
  sendCure = (e) => {
    e.preventDefault();

    cureService.addCure(this.props.id, this.state.count).then(
      (response) => {
        this.setState({ status: response.message });
        window.location.reload(false);
      },
      (error) => this.setState({ status: error.message })
    );
  };

  countRef = React.createRef();

  render() {
    const { id } = this.props;
    const { count, status } = this.state;
    if (!id) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div className="edit-cure">
        <p>Додавання препарату з id</p>
        <p>{id}</p>
        <input
          ref={this.countRef}
          type="text"
          onChange={this.handleChange}
          value={count}
        />
        <p>{status}</p>
        <button onClick={this.sendCure}>Змінити кількість</button>
      </div>
    );
  }
}
