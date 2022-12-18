import BootstrapButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "./Button";

export const ButtonGroup = ({ buttonProperties, type}) => {
  const buttonDisplay = (buttonProperty, i) => {
    return (
      buttonProperty.isActive &&
      <Button
        type={type}
        variant={buttonProperty.variant}
        buttonClass={buttonProperty.buttonClass}
        key={i}
        buttonName={buttonProperty.buttonName}
        onClick={buttonProperty.onClick}
        isActive={buttonProperty.isActive}
      />
    );
  };
  return (
    <BootstrapButtonGroup aria-label="Basic example" size="sm">
      {buttonProperties.map((buttonProperty, i) =>
        buttonDisplay(buttonProperty, i)
      )}
    </BootstrapButtonGroup>
  );
};
