import React, { Fragment } from "react";
import { CureRow } from "../_func_components";
import { organizationService } from "../_services/organization.service";

const Footer = ({ currentUser }) => {
  return (
    <footer>
      {currentUser ? (
        <Fragment>
          <CureRow name="Роль в системі:" value={currentUser.employeeType} />
          <CureRow name="Ваша пошта:" value={currentUser.email} />
        </Fragment>
      ) : (
        <CureRow
          name="Роль в системі:"
          value="Ви увійшли як незареєстрований користувач"
        />
      )}
      <CureRow name="Телеграм розробника:" value="@bmolchanov" />
      <CureRow
        name="Назва веб-сервісу:"
        value="Система обліку та пошуку ліків"
      />
      <CureRow name="Рік розробки:" value="2020" />
    </footer>
  );
};
export { Footer };
