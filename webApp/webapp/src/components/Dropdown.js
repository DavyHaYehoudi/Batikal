import BootstrapDropdown from "react-bootstrap/Dropdown";

const Dropdown = ({
  element,
  actions,
  quoteStatus,
  subDropDirection,
  mainDropDirection,
  arrowDisplay,
  onClick,
  deletedByUser,
  isAdmin,
  folderStep,
}) => {
  const actionsDisplay = (action, i) => {

    return action.subDropdowns !== null ? (
      subDropdownDisplay(action, i)
    ) : isAdmin && action.isAdmin ? (
      <BootstrapDropdown.Item
        key={action.id}
        className={
          // toogle "consulter/générer"
          (quoteStatus === "0" && action.id === "0") ||
          // si dossier supprimé par user alors actionner "réactiver le dossier"
          (!deletedByUser && action.id === "4" && "disabled")
        }
        onClick={() => onClick(action.id)}
      >
        {action.header}
      </BootstrapDropdown.Item>
    ) : (
      !isAdmin && (
        <BootstrapDropdown.Item
          key={action.id}
          className={
            quoteStatus === "0"
              ? // toogle "consulter/générer"
                (action.id === "0" ||
                  // Si stade n'est pas chantier alors empêcher création devis
                  (folderStep !== "chantier" && action.id === "5")) &&
                "disabled"
              : //  toogle "consulter/générer"
                quoteStatus !== "0" && action.id === "5" && "disabled"
          }
          onClick={() => onClick(action.id)}
        >
          {action.isUser && action.header}
        </BootstrapDropdown.Item>
      )
    );
  };

  const subDropdownDisplay = (action, i) => {
    return (
      <BootstrapDropdown drop={subDropDirection} key={i}>
        <BootstrapDropdown.Toggle
          variant=""
          style={{ fontSize: "1rem", paddingLeft: "14px" }}
        >
          {action.header}
        </BootstrapDropdown.Toggle>
        <BootstrapDropdown.Menu key={i}>
          {action.subDropdowns.map((subDropdown, i) => (
            <BootstrapDropdown.Item
              key={i}
              onClick={() => onClick(action.id, i)}
            >
              {subDropdown}
            </BootstrapDropdown.Item>
          ))}
        </BootstrapDropdown.Menu>
      </BootstrapDropdown>
    );
  };

  return (
    <BootstrapDropdown drop={mainDropDirection} style={{ margin: "0" }}>
      <BootstrapDropdown.Toggle variant="" size="sm" className={arrowDisplay}>
        {element}
      </BootstrapDropdown.Toggle>

      <BootstrapDropdown.Menu>
        {actions.map((action, i) => actionsDisplay(action, i))}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
};

export default Dropdown;
