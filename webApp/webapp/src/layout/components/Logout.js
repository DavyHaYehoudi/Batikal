import { NavLink } from "react-router-dom";
import { Overlay } from "../../components/Overlay";


export const Logout = () => {
  return (
    <Overlay
      contain={"Se déconnecter"}
      element={
        <NavLink to="/">
          <button
            type="button"
            className="m-4 btn btn-white btn-sm btn-active-warning"
            onClick={()=>localStorage.clear()}
          >
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  opacity="0.9"
                  width="42"
                  height="2"
                  rx="1"
                  transform="matrix(-1 0 0 1 15.5 11)"
                  fill="black"
                />
                <path
                  d="M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z"
                  fill="black"
                />
                <path
                  d="M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z"
                  fill="#C4C4C4"
                />
              </svg>
            </span>
          </button>
        </NavLink>
      }
    />
  );
};