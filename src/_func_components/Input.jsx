import React from "react";

const Input = ({ type, text, reference, onChange, value, classNames }) => (
  <label className="input-label">
    <p className="label-p">{text}:</p>
    <input
      ref={reference}
      type={type}
      value={value}
      onChange={onChange}
      className={classNames}
    ></input>
  </label>
);
export { Input };
