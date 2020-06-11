import React, { Fragment } from "react";
import { CureRow } from "../_func_components/CureRow";
import { Link } from "react-router-dom";
export const UserOneCure = ({ item }) => {
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
    <div className="user-one-block">
      <div className="name-details">
        <CureRow name="Назва українською:" value={nameUkainian} />
        <CureRow name="Назва латинською:" value={nameInternational} />
        <button className="cure-button">
          <Link to={`/${id}`} className="button-link">
            Деталі
          </Link>
        </button>
      </div>
      <div className="other">
        <CureRow name="Форма випуску:" value={form} />
      </div>
    </div>
  );
};
