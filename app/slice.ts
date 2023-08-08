import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface FilterState {
  searchInput: string | null;
  inStockOnly: boolean;
}

const initialState: FilterState = {
  searchInput: null,
  inStockOnly: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
      return state;
    },
    flipInStockOnly: (state) => {
      state.inStockOnly = !state.inStockOnly;
      return state;
    },
  },
});

export const { updateSearchInput, flipInStockOnly } = filterSlice.actions;

export const selectSearchInput = (state: RootState) => state.filter.searchInput;
export const selectInStockOnly = (state: RootState) => state.filter.inStockOnly;

export default filterSlice.reducer;
