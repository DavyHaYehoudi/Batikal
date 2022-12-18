import { NavLink } from "react-router-dom";
import { Logout } from "./components/Logout";

const Navbar = ({ navsTo, navStyle, navClass, navLinkStyle }) => {
  const NavsToDisplay = (navTo, i) => {
    return (
      <span className="navigation" key={navTo.name}>
        <NavLink
          to={navTo.to}
          style={navLinkStyle}
          className={(navData) => navData.isActive ? "navActive" : undefined}
          // target="_blank" rel="noopener noreferrer"
        >{navTo.name}</NavLink>
      </span>
    );
  };

  return (
    <div className={navClass} style={navStyle}>
      <div>{navsTo.map((navTo, i) => NavsToDisplay(navTo, i))}</div>
      <Logout />
    </div>
  );
};

Navbar.defaultProps = {
  navStyle: { backgroundColor: "rgb(14,74,112)" },
  navClass:
    "d-flex justify-content-between align-items-center fw-boldest fs-5 pb-5 pt-5",
  navLinkStyle: { color: "rgb(255,158,94)", marginLeft: "20px" },
};

export default Navbar;
