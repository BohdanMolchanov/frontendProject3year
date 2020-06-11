import React, { Fragment } from "react";
import { cureService } from "@/_services";
import { Route, Redirect } from "react-router-dom";
import { OneCure } from "./OneCure";
import { EditCureBlock } from "./EditCureBlock";

class CureBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  addCure(e) {}
  state = {
    cureIntName: "",
    cureIdToChange: "",
    isPharmacist: "",
    curesList: "",
    status: "",
    count: "",
    showEditCure: "",
    organizationCures: "",
  };
  sendCure = (e) => {
    e.preventDefault();
    this.setState({
      cureIdToChange: e.target.value,
      showEditCure: true,
    });
    console.log(e.target.value);
  };

  render() {
    const { curesList, count } = this.props;
    const { showEditCure, cureIdToChange } = this.state;
    // const {applicantCountry,
    //     applicantName,
    //     atcCode,
    //     composition,
    //     conditions,
    //     dateEnd,
    //     dateStart,
    //     form,
    //     id,
    //     instruction,
    //     manufacturerCountry,
    //     manufacturerName,
    //     nameInternational,
    //     nameUkainian,
    //     passportNumber
    // } = curesList;
    //console.log(applicantCountry);
    return (
      <Fragment>
        {status && <h1>{status}</h1>}
        {showEditCure && (
          <EditCureBlock
            id={cureIdToChange}
            status="Введіть число лікарських препаратів"
          />
        )}
        {curesList.map((item) => (
          <div key={item.id} className="cure-block">
            <OneCure item={item} />
            <button value={item.id} onClick={this.sendCure}>
              Додати до організації
            </button>
          </div>
        ))}
      </Fragment>
    );
  }
}

export { CureBlock };
