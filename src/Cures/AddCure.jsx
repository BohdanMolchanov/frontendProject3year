import React, { Fragment } from "react";

import { authenticationService, cureService } from "@/_services";
import { identity } from "rxjs";
import { CureBlock } from "../_components/CureBlock";
import { Select } from "../_func_components/Select";

// <select ref={this.selectRef}value={selectText} onChange={this.handleChange}>
//                                 {cures.map(doc => <option key={doc} value={doc}>{doc}</option>)}
//                             </select>

class AddCure extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    cureId: "",
    status: "",
    selectText: "",
    cures: "",
    status: "",
    cureInternationalName: "",
    organizationCures: "",
  };
  componentDidMount() {
    cureService
      .getNames()
      .then((result) =>
        this.setState({ cures: result, cureInternationalName: result[0] })
      );
    cureService
      .getOrganizationCures()
      .then((result) => this.setState({ organizationCures: result }));
  }
  handleNameSelectChange = (e) => {
    let orgIds = this.state.organizationCures.map((doc) => doc.id);
    console.log(orgIds);
    this.setState({
      selectText: this.selectRef.current.value,
      cureId: "",
      cureInternationalName: e.target.value,
    }),
      cureService.getByInternationalName(e.target.value).then(
        (result) => {
          console.log(result);
          this.setState({ curesList: result, status: "Успішно додано" });
        },
        (error) => this.setState({ status: error })
      );
  };

  componentDidUpdate() {}

  selectRef = React.createRef();

  render() {
    const {
      selectText,
      cures,
      status,
      optionValue,
      cureInternationalName,
      curesList,
    } = this.state;
    return (
      <form>
        <div className="send-cure">
          {cures && (
            <Select
              reference={this.selectRef}
              list={cures}
              value={cureInternationalName}
              onChange={this.handleNameSelectChange}
              keyText="_curename"
            />
          )}
          {curesList && (
            <CureBlock
              cureInternationalName={cureInternationalName}
              isPharmacist="true"
              curesList={curesList}
            />
          )}
        </div>
      </form>
    );
  }
}

export { AddCure };
