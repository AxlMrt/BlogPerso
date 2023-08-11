/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IBook, IBooksParams } from "../../types";
import { RootState } from "../configureStore";
import agent from "../../axios/agent";

interface CatalogState {
  booksLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  types: Array<{ type: string }> ;
  booksParams: IBooksParams;
}

const booksAdapter = createEntityAdapter<IBook>();

function getAxiosParams(booksParams: IBooksParams) {
  const params = new URLSearchParams();
  if (booksParams.searchTerm)params.append('searchTerm', booksParams.searchTerm);
  if (booksParams.types.length > 0) params.append('types', booksParams.types.toString());

  return params;
}

export const fetchBooksAsync = createAsyncThunk<IBook[], string, {state: RootState}>(
  'userQuery/fetchBooksAsync',
  async (id, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().userQuery.booksParams);
    try {
      const response = await agent.UserQuery.list(id, params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const fetchFilters = createAsyncThunk<{ type: string }[], string>(
  'userQuery/fetchFilters',
  async (id, thunkApi) => {
    try {
      const response = await agent.UserQuery.fetchFilters(id);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data })
    }
  }
)

function initParams() {
  return {
    orderBy: 'name',
    types: []
  }
}

export const userQuerySlice = createSlice({
  name: 'userQuery',
  initialState: booksAdapter.getInitialState<CatalogState>({
    booksLoaded: false,
    filtersLoaded: false,
    status: 'idle',
    types: [],
    booksParams: initParams(),
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.booksLoaded = false;
      state.booksParams = { ...state.booksParams, ...action.payload, pageNumber: 1 };
    },
    setPageNumber: (state, action) => {
      state.booksLoaded = false;
      state.booksParams = { ...state.booksParams, ...action.payload};
    },
    resetProductParams: (state) => {
      state.booksParams = initParams();
    },

  },
  extraReducers: (builder => {
    builder.addCase(fetchBooksAsync.pending, (state) => {
      state.status = 'pendingFetchBooks';
    });
    builder.addCase(fetchBooksAsync.fulfilled, (state, action) => {
      booksAdapter.setAll(state, action.payload);
      state.status = 'idl';
      state.booksLoaded = true;
    });
    builder.addCase(fetchBooksAsync.rejected, (state) => {
      state.status = 'idle';
    });

    builder.addCase(fetchFilters.pending, (state) => {
      state.status = 'pendingFetchFilters';
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.types = action.payload
      state.filtersLoaded = true;
      state.status = 'idle';
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
  })
})

export const booksSelectors = booksAdapter.getSelectors((state: RootState) => state.userQuery);
export const { setProductParams, resetProductParams, setPageNumber } = userQuerySlice.actions;