import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Delete, Get, Post, Put } from "../myHttpHelper";

export const getSimulationsList = createAsyncThunk(
  "simulations/getSimulationsList",
  async (body) => {
    let params = {
      partner_Name: body.partner_Name,
    };
    try {
      const getSimulationsList = await Get(
        "/folders",
        params,
        body.authorizationToken
      );
      return getSimulationsList.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const deleteSimulations = createAsyncThunk(
  "simulations/deleteSimulations",
  async (body) => {
    try {
      const deleteSimulations = await Delete(
        `/folders/${body.quote_FK}`,
        body,
        body.authorizationToken
      );
      return deleteSimulations.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const reactived = createAsyncThunk(
  "simulations/reactived",
  async (body) => {
    try {
      const reactived = await Put(
        "/folders/reactived",
        body,
        body.authorizationToken
      );
      return reactived.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const getArchivesList = createAsyncThunk(
  "simulations/getArchivesList",
  async (body) => {
    let params = {
      archivedBy_id: body.archivedBy_id,
      partner_Name: body.partner_Name,
    };
    try {
      const getArchivesList = await Get(
        "/archives",
        params,
        body.authorizationToken
      );
      return getArchivesList.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const archived = createAsyncThunk(
  "simulations/archived",
  async (body) => {
    try {
      const archived = await Put(
        "/archives/archived",
        body,
        body.authorizationToken
      );
      return archived.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const unarchived = createAsyncThunk(
  "simulations/unarchived",
  async (body) => {
    try {
      const unarchived = await Put(
        "/archives/unarchived",
        body,
        body.authorizationToken
      );
      return unarchived.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const searchFilterSimulations = createAsyncThunk(
  "simulations/searchFilterSimulationsList",
  async (body) => {
    try {
      const searchFilterSimulations = await Post(
        "/filters/search/folders",
        body,
        body.authorizationToken
      );
      return searchFilterSimulations.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const searchFilterArchives = createAsyncThunk(
  "simulations/searchFilterInArchives",
  async (body) => {
    try {
      const searchFilterArchives = await Post(
        "/filters/search/archives",
        body,
        body.authorizationToken
      );
      return searchFilterArchives.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const filterBlock = createAsyncThunk(
  "simulations/blockFilterList",
  async (data) => {
    try {
      const body = {
        data: data.filter,
        domain: data.domain,
        archivedBy_id: data.archivedBy_id,
        partner_Name: data.partner_Name,
      };
      const filterBlock = await Post(
        "/filters/filterBlock",
        body,
        data.authorizationToken
      );
      return filterBlock.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const quoteStatusChange = createAsyncThunk(
  "simulations/quoteStatusChange",
  async (data) => {
    try {
      const body = {
        id: data.id,
        number: data.number,
        quoteStatusOptions: data.quoteStatusOptions,
      };
      const quoteStatusChange = await Put(
        "/folders/quotestatus",
        body,
        data.authorizationToken
      );
      return body;
    } catch (err) {
      return err.message;
    }
  }
);

export const simulationsSlice = createSlice({
  name: "simulations",
  initialState: {
    simulations: null,
    archives: null,
    loading: false,
    modalQuoteCreate: false,
  },
  reducers: {
    edit: (state, action) => {
      state.simulations.find(
        (item) => item._id === action.payload
      ).messages[0].read = true;
    },
    modalQuoteCreate: (state, action) => {
      state.modalQuoteCreate = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getSimulationsList.pending, (state, action) => {
      state.loading = true;
    });
   
    builder.addCase(getSimulationsList.fulfilled, (state, action) => {
      state.simulations = action.payload;
      state.loading = false;
    });
    builder.addCase(reactived.fulfilled, (state, action) => {
      let indexS = state.simulations.findIndex(
        (item) => item._id === action.payload._id
      );
      state.simulations.splice(indexS, 1, action.payload);
    });
    builder.addCase(deleteSimulations.fulfilled, (state, action) => {
      if (action.payload.archived) {
        let indexA = state.archives.findIndex(
          (item) => item._id === action.payload._id
        );
        state.archives.splice(indexA, 1);
      } else {
        let indexS = state.simulations.findIndex(
          (item) => item._id === action.payload._id
        );
        state.simulations.splice(indexS, 1);
      }
    });
    builder.addCase(getArchivesList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getArchivesList.fulfilled, (state, action) => {
      state.archives = action.payload;
      state.loading = false;
    });
    builder.addCase(archived.fulfilled, (state, action) => {
      let indexA = state.simulations.findIndex(
        (item) => item._id === action.payload._id
      );
      state.simulations.splice(indexA, 1);
    });
    builder.addCase(unarchived.fulfilled, (state, action) => {
      let indexA = state.archives.findIndex(
        (item) => item._id === action.payload._id
      );
      state.archives.splice(indexA, 1);
    });

    builder.addCase(searchFilterSimulations.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchFilterSimulations.fulfilled, (state, action) => {
      state.simulations = action.payload;
      state.loading = false;
    });
    builder.addCase(searchFilterArchives.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchFilterArchives.fulfilled, (state, action) => {
      state.archives = action.payload;
      state.loading = false;
    });
    builder.addCase(filterBlock.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(filterBlock.fulfilled, (state, action) => {
      state.simulations = action.payload;
      state.archives = action.payload;
      state.loading = false;
    });
  },
});

export const { edit, modalQuoteCreate, } =
  simulationsSlice.actions;
export default simulationsSlice.reducer;
