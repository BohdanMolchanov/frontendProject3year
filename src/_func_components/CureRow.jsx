import React from "react";

const CureRow = ({ name, value }) => {
  return (
    <div className="cure-row">
      <p className="cure-h-text">{name}</p>
      <p className="cure-text">{value}</p>
    </div>
  );
};
export { CureRow };
