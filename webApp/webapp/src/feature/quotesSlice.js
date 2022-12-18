import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get, Post, Put } from "../myHttpHelper";
import { indexCheet } from "../utils";

export const quoteGenerate = createAsyncThunk(
  "quote/quoteGenerate",
  async (body) => {
    try {
      const quoteGenerate = await Post(
        "/quote/generate",
        body,
        body.authorizationToken
      );
      return quoteGenerate.data;
    } catch (err) {
      console.log("erreurs de quote Gererate :", err);
      // throw err;
      return err;
    }
  }
);
export const quoteGetOne = createAsyncThunk(
  "quote/quoteGetOne",
  async (body) => {
    let params = {
      id: body.id,
    };
    try {
      const quoteGetOne = await Get(
        `/quote/${body.id}`,
        params,
        body.authorizationToken
      );
      return quoteGetOne.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const quoteCreatorGet = createAsyncThunk(
  "quote/quoteCreatorGet",
  async (body) => {
    let params = {
      id: body.id_creator,
    };
    try {
      const quoteCreatorGet = await Get(
        "/user/oneUser",
        params,
        body.authorizationToken
      );
      return quoteCreatorGet.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const quoteBtnRegister = createAsyncThunk(
  "quote/quoteButtonRegister",
  async (body) => {
    try {
      const quoteBtnRegister = await Put(
        "/quote/btn/register",
        body,
        body.authorizationToken
      );
      return quoteBtnRegister.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const quoteBtnSubmit = createAsyncThunk(
  "quote/quoteButtonSubmit",
  async (body) => {
    try {
      const quoteBtnSubmit = await Post(
        "/quote/btn/submit",
        body,
        body.authorizationToken
      );
      return quoteBtnSubmit.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const quoteBtnModify = createAsyncThunk(
  "quote/quoteButtonModify",
  async (body) => {
    try {
      const quoteBtnModify = await Post(
        "/quote/btn/modify",
        body,
        body.authorizationToken
      );
      return quoteBtnModify.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const quoteBtnAdminControl = createAsyncThunk(
  "quote/quoteButtonAdminControl",
  async (body) => {
    try {
      const quoteBtnAdminControl = await Post(
        "/quote/btn/admincontrol",
        body,
        body.authorizationToken
      );
      return quoteBtnAdminControl.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    quote: null,
    quoteCreator: null,
    loadingAction: false,
    cannotBeCreated: false,
    loadingPage: true,
  },

  reducers: {
    // Gestion de la modale création de devis impossible
    handleQuoteCreated: (state, action) => {
      state.cannotBeCreated = false;
    },

    //Fill fields not in cheet
    addQuoteField: (state, action) => {
      const { content, property } = action.payload;
      state.quote[0][property] = content;
    },

    //Fill fields in cheet
    addCheetDescriptive: (state, action) => {
      const { cheets, cheet_id, content } = action.payload;
      let cheetIndex;
      let index = indexCheet(cheets, cheet_id, cheetIndex);
      let collect = [];
      for (let i = 0; i < content.length; i++) {
        collect.push(content[i]);
      }
      state.quote[0].cheets[index].descriptive = collect;
    },

    removeCheetDescriptive: (state, action) => {
      const { cheets, cheet_id, index } = action.payload;
      let cheet = cheets.find((item) => item.id === cheet_id);
      let cheetIndex = cheets.indexOf(cheet);
      let newDescriptive = [...cheet.descriptive];
      newDescriptive.splice(index, 1);
      state.quote[0].cheets[cheetIndex].descriptive = newDescriptive;
      state.quote[0].cheets[cheetIndex].descriptiveTemp = newDescriptive;
    },

    addCheetField: (state, action) => {
      const { value, cheets, cheet_id, property, PU, HT, TVAnewValue } =
        action.payload;
      let index = indexCheet(cheets, cheet_id);
      state.quote[0].cheets[index][property] = value;
      state.quote[0].cheets[index]["TVA"] = TVAnewValue;
      state.quote[0].cheets[index]["PU"] = PU;
      state.quote[0].cheets[index]["HT"] = HT;
    },

    cumulationTTCquote: (state, action) => {
      state.quote[0].cumulationTTC = action.payload;
    },
    recoveryRateUpdate: (state, action) => {
      state.quote[0].recoveryRate = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(quoteGenerate.fulfilled, (state, action) => {
      if (action.payload.name === "AxiosError") {
        state.cannotBeCreated = true;
      } else {
        state.cannotBeCreated = false;
      }
    });
    builder.addCase(quoteGetOne.fulfilled, (state, action) => {
      state.quote = action.payload;
      state.loadingPage = false;
    });
    builder.addCase(quoteCreatorGet.fulfilled, (state, action) => {
      state.quoteCreator = action.payload;
    });
    builder.addCase(quoteBtnRegister.pending, (state, action) => {
      state.loadingAction = true;
    });
    builder.addCase(quoteBtnRegister.fulfilled, (state, action) => {
      state.quote = action.payload;
      state.loadingAction = false;
    });
    builder.addCase(quoteBtnSubmit.pending, (state, action) => {
      state.loadingAction = true;
    });
    builder.addCase(quoteBtnSubmit.fulfilled, (state, action) => {
      state.quote = action.payload;
      state.loadingAction = false;
    });
    builder.addCase(quoteBtnModify.pending, (state, action) => {
      state.loadingAction = true;
    });
    builder.addCase(quoteBtnModify.fulfilled, (state, action) => {
      state.quote = action.payload;
      state.loadingAction = false;
    });
    builder.addCase(quoteBtnAdminControl.pending, (state, action) => {
      state.loadingAction = true;
    });
    builder.addCase(quoteBtnAdminControl.fulfilled, (state, action) => {
      state.quote = action.payload;
      state.loadingAction = false;
    });
  },
});

export const {
  comments,
  notes,
  date,
  addCheetDescriptive,
  removeCheetDescriptive,
  addCheetField,
  addQuoteField,
  cumulationTTCquote,
  recoveryRateUpdate,
  handleQuoteCreated,
} = quotesSlice.actions;
export default quotesSlice.reducer;
