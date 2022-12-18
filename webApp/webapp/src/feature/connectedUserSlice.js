import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get, Post, Put } from "../myHttpHelper";

export const connectedUserInfo = createAsyncThunk(
  "user/connectedUserInfo",
  async (body) => {
    let params = { id: body.id };
    try {
      const connectedUserInfo = await Get(
        "/user/oneUser",
        params,
        body.authorizationToken
      );
      return connectedUserInfo.data;
    } catch (err) {
      return err;
    }
  }
);
export const userLogin = createAsyncThunk("user/userLogin", async (body) => {
  try {
    const userLogin = await Post("/user/login", body, body.authorizationToken);
    return userLogin.data;
  } catch (err) {
    return err;
  }
});

/*----------------------------------For the page "Mon Compte"----------------------------------*/
export const accountProfileUpdate = createAsyncThunk(
  "account/accountProfileUpdate",
  async (body) => {
    try {
      await Put("/user/account", body, body.authorizationToken);
      return body;
    } catch (err) {
      return err;
    }
  }
);
export const accountProfileGet = createAsyncThunk(
  "account/accountProfileGet",
  async (body) => {
    let params = { id: body.id };
    try {
      const accountProfileGet = await Get(
        "/user/account",
        params,
        body.authorizationToken
      );
      return accountProfileGet.data;
    } catch (err) {
      return err;
    }
  }
);
export const accountUploadLogo = createAsyncThunk(
  "account/accountUploadLogo",
  async (body) => {
    try {
      const accountUploadLogo = await Put(
        "/user/account/upload",
        body,
        body.authorizationToken
      );
      return accountUploadLogo.data;
    } catch (err) {
      return err;
    }
  }
);

/*----------------------------------For the page "Mon Compte"----------------------------------*/

const initialState = {
  userInfo: null,
  status: null,
  loading: false,
};

export const connectedUserSlice = createSlice({
  name: "connectedUserInfo",
  initialState: {
    userInfo: null,
    status: null,
    loading: false,
    connexionEDF: false,
  },
  reducers: {
    connexionEDFlogin: (state, action) => {
      state.connexionEDF = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(connectedUserInfo.fulfilled, (state, action) => {
        state.status = "succès";
        state.userInfo = action.payload;
      })
      .addCase(connectedUserInfo.pending, (state, action) => {
        state.status = "en attente";
      })
      .addCase(connectedUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.connexionEDF = false;
      let connectedUser;
      if (action.payload.name === "AxiosError") {
        connectedUser = { auth: "ERR_BAD_REQUEST" };
      } else {
        connectedUser = {
          DBuserId: action.payload.DBuserId,
          partner_Name: action.payload.partner_Name,
          timesTamp: action.payload.timesTamp,
          isAdmin: action.payload.isAdmin,
          authorizationToken: action.payload.authorizationToken,
          auth: "ok",
        };
        window.location.href = "/folders";
      }
      localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
    });
    /*-----------------For the page "Mon Compte"----------------------------*/
    builder.addCase(accountProfileUpdate.pending, (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      state.loading = true;
    });
    builder.addCase(accountProfileUpdate.fulfilled, (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      state.loading = false;
    });
    builder.addCase(accountProfileGet.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(accountUploadLogo.fulfilled, (state, action) => {
      state.userInfo.logo = action.payload.message;
    });
  },
});

export const { connexionEDFlogin } = connectedUserSlice.actions;
export default connectedUserSlice.reducer;
