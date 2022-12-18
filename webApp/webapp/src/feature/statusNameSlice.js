import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get } from "../myHttpHelper";

export const getStatusNameList = createAsyncThunk(
  "statusName/getStatusName",
  async (data) => {
    let params = null;
    try {
      const getStatusName = await Get(
        "/statusname",
        params,
        data.authorizationToken
      );
      return getStatusName.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const statusNameSlice = createSlice({
  name: "statusName",
  initialState: {
    statusName: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getStatusNameList.fulfilled, (state, action) => {
      state.statusName = action.payload;
    });
  },
});

export const {} = statusNameSlice.actions;
export default statusNameSlice.reducer;
