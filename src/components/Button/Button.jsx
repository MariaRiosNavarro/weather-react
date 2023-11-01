import React from "react";

const Button = ({ text, className }) => {
  return (
    <>
      <h1>Button</h1>
      <button className={className}>{text}</button>
    </>
  );
};

export default Button;
