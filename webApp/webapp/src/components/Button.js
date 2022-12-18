import React from "react";
import BootstrapButton from "react-bootstrap/Button";

const Button = ({ disabled, type, variant, buttonClass, buttonName,style,onClick }) => {
  return (
    <BootstrapButton
      disabled={disabled}
      type={type}
      variant={variant}
      className={buttonClass}
      style={style}
      onClick={onClick}
    >
      {buttonName}
    </BootstrapButton>
  );
};

Button.defaultProps = {
  disabled: false,
  type: "submit",
  variant: "",
  active: false,
  buttonClass: "btn btn-outline-warning border border-primary fw-boldest",
};

export default Button;
