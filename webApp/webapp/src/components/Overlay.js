import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const Overlay = ({ contain, placement, element, tooltipClass }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className={tooltipClass} {...props}>
      {contain}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {element}
    </OverlayTrigger>
  );
};

Overlay.defaultProps = {
  placement: "bottom",
};
