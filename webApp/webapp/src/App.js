import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import SimulationsView from "./views/lists/SimulationsView";
import ArchivesView from "./views/lists/ArchivesView";
import LoginView from "./views/login/LoginView";
import Redacting from "./views/quote/Quote";
import AccountView from "./views/account/AccountView";

export default function App() {
  const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  const dateNow = new Date().getTime();

 /*  if (connectedUser) {
    console.log("connectedUser.timesTamp :", connectedUser.timesTamp);
    let diff = (connectedUser.timesTamp - dateNow);
    console.log("écart des timestamps :", diff);
  }

  */

  function RequireAuth({ children }) {
    let location = useLocation();

    if (
      connectedUser === "" ||
      (connectedUser && dateNow > connectedUser.timesTamp)
    ) {
      localStorage.clear();
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route
          path="/folders"
          element={
            <RequireAuth>
              <SimulationsView />
            </RequireAuth>
          }
        />
        <Route
          path="/archives"
          element={
            <RequireAuth>
              <ArchivesView />
            </RequireAuth>
          }
        />
        <Route
          path="/quote/:id"
          element={
            <RequireAuth>
              <Redacting />
            </RequireAuth>
          }
        />
        <Route
          path="/account"
          element={
            <RequireAuth>
              <AccountView />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}
