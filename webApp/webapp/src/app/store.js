import { configureStore } from "@reduxjs/toolkit";
import simulationsReducer from "../feature/simulationsSlice";
import messagingReducer from "../feature/messagingSlice";
import connectedUserReducer from "../feature/connectedUserSlice";
import quotesReducer from "../feature/quotesSlice";
import statusNameReducer from "../feature/statusNameSlice";

export default configureStore({
  reducer: {
    simulations: simulationsReducer,
    messaging: messagingReducer,
    connectedUser: connectedUserReducer,
    quotes: quotesReducer,
    statusName: statusNameReducer,
  },
});
