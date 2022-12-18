import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get, Post } from "../myHttpHelper";

export const sendMessage = createAsyncThunk(
  "messaging/sendMessage",
  async (body) => {
    try {
      const sendMessage = await Post(
        "/messaging/send",
        body,
        body.authorizationToken
      );
      return sendMessage.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const loadMessage = createAsyncThunk(
  "messaging/loadMessage",
  async (data) => {
    try {
      const params = {
        postAuthor_id: data.postAuthor_id,
        simulation_FK: data.simulation_FK,
      };
      const loadMessage = await Get(
        "/messaging/load",
        params,
        data.authorizationToken
      );
      return loadMessage.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const messagingSlice = createSlice({
  name: "messaging",
  initialState: {
    messaging: [],
  },
  reducers: {
    clear: (state, action) => {
      state.messaging = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.messaging.push(action.payload);
    });
    builder.addCase(loadMessage.fulfilled, (state, action) => {
      state.messaging = action.payload;
    });
  },
});

export const { clear } = messagingSlice.actions;
export default messagingSlice.reducer;
