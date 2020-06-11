import React, { Fragment } from "react";
import { CureRow } from "../_func_components/CureRow";
export const OneCure = ({ item }) => {
  const {
    applicantCountry,
    applicantName,
    atcCode,
    composition,
    conditions,
    dateEnd,
    dateStart,
    form,
    id,
    instruction,
    manufacturerCountry,
    manufacturerName,
    nameInternational,
    nameUkainian,
    passportNumber,
  } = item;
  return (
    <div className="one-block">
      <CureRow name="id:" value={id} />
      <CureRow name="Назва українською:" value={nameUkainian} />
      <CureRow name="Назва латинською:" value={nameInternational} />
      {atcCode && <CureRow name="ATC:" value={atcCode} />}
      {passportNumber && (
        <CureRow name="Номер паспорта:" value={passportNumber} />
      )}
      {form && <CureRow name="Форма випуску:" value={form} />}
      {composition && <CureRow name="Вміст:" value={composition} />}
      {manufacturerCountry && (
        <CureRow name="Країна-виробник:" value={manufacturerCountry} />
      )}
      {manufacturerName && (
        <CureRow name="Назва виробника:" value={manufacturerName} />
      )}
    </div>
  );
};
