import React from "react";
import { CureRow } from "./CureRow";
import { from } from "rxjs";
import { userService } from "../_services/user.service";

const EmployeeBlock = ({ id, fname, sname, lname, role }) => {
  const deleteUser = () => {
    userService.deleteById(id).then(
      (response) => {
        window.location.reload(false);
      },
      (error) => console.log(error)
    );
  };
  return (
    <div className="employee-block">
      <div>
        <CureRow name="Ім'я" value={fname} />
        <CureRow name="Прізвище" value={lname} />
        <CureRow name="По-батькові" value={sname} />
        <CureRow name="Роль" value={role} />
      </div>
      <button onClick={deleteUser}>Видалити співробітника</button>
    </div>
  );
};
export { EmployeeBlock };
