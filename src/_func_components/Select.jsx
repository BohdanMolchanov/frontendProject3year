import React from "react";

const Select = ({ list, keyText, reference, onChange, value }) => (
  <select
    ref={reference}
    value={value}
    onChange={onChange}
    className="cure-select"
  >
    {list.map((doc) => (
      <option key={`${doc}${keyText}`} value={doc}>
        {doc}
      </option>
    ))}
  </select>
);
export { Select };
