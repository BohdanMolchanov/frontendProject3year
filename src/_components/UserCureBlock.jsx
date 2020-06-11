import React, { Fragment } from "react";
import { cureService } from "@/_services";
import { Route, Redirect } from "react-router-dom";
import { OneCure } from "./OneCure";
import { EditCureBlock } from "./EditCureBlock";
import { UserOneCure } from "./UserOneCure";

class UserCureBlock extends React.Component {
  constructor(props) {
    super(props);
  }
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

  render() {
    const { curesList, count } = this.props;
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
        {curesList.map((item) => (
          <div key={item.id} className="cure-block">
            <UserOneCure item={item} />
          </div>
        ))}
      </Fragment>
    );
  }
}

export { UserCureBlock };
