import React, { Fragment } from "react";

import { userService, authenticationService, cureService } from "@/_services";
import { UserCureBlock } from "../_components/UserCureBlock";
import { Redirect } from "react-router-dom";
import { history, Role } from "@/_helpers";
import { CureRow } from "@/_func_components/CureRow";

class CurePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      userFromApi: "",
      cureId: "",
      cure: "",
      organizations: "",
    };
  }
  componentWillMount() {
    const id = this.props.match.params.id || "";
    this.setState({
      cureId: id,
    });
    cureService.getCureById(id).then((response) => {
      this.setState({
        cure: response,
      });
    });
    cureService.getOrganizationsByCureId(id).then((response) => {
      this.setState({
        organizations: response,
      });
    });
  }
  setCount(count) {
    switch (count) {
      case count == 0 || null:
        return "Немає на складі";
      case count > 0 && count < 50:
        return "Скоро закінчиться";
      default:
        return "Присутнє";
    }
  }
  render() {
    const {
      atcCode,
      composition,
      conditions,
      form,
      instruction,
      manufacturerCountry,
      manufacturerName,
      nameInternational,
      nameUkainian,
      passportNumber,
    } = this.state.cure;
    const { organizations } = this.state;
    return (
      <div className="cure-page">
        <CureRow name="Назва українською:" value={nameUkainian} />
        <CureRow name="Назва латинською:" value={nameInternational} />
        {conditions && <CureRow name="Умови випуску:" value={conditions} />}
        {form && <CureRow name="Форма випуску:" value={form} />}
        {composition && <CureRow name="Вміст:" value={composition} />}
        {manufacturerCountry && (
          <CureRow name="Країна-виробник:" value={manufacturerCountry} />
        )}
        {manufacturerName && (
          <CureRow name="Назва виробника:" value={manufacturerName} />
        )}
        {atcCode && <CureRow name="ATC:" value={atcCode} />}
        {passportNumber && (
          <CureRow name="Номер паспорта:" value={passportNumber} />
        )}
        {instruction && (
          <div className="cure-row">
            <p className="cure-h-text">Інструкція:</p>
            <a className="cure-text" href={instruction}>
              Скачати
            </a>
          </div>
        )}
        {organizations[0] ? (
          <div className="cure-organizations">
            {organizations.map((item) => (
              <div className="organization" key={item.id}>
                <CureRow name="Назва організації:" value={item.orgName} />
                <CureRow
                  name="Наявність на складі:"
                  value={this.setCount(item.count)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="cure-organizations">
            Нажаль, товар у всіх відділень системи відсутній
          </div>
        )}
      </div>
    );
  }
}

export { CurePage };
