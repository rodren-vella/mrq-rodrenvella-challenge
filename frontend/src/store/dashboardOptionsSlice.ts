import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
  activeSymbol: string | null;
  showCardInfo: boolean;
}

const initialState: StoreState = {
  activeSymbol: '',
  showCardInfo: true
};

export const dashboardOptionsSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    toggleShowCardInfo: (state) => {
      state.showCardInfo = !state.showCardInfo;
    },
    saveActiveSymbol: (state, action: PayloadAction<string>) => {
      state.activeSymbol = action.payload;
    }
  }
});

export const { toggleShowCardInfo, saveActiveSymbol } = dashboardOptionsSlice.actions;

export const selectShowCardInfo = (state: { store: StoreState }) => state.store.showCardInfo;
export const getActiveSymbol = (state: { store: StoreState }) => state.store.activeSymbol;

export default dashboardOptionsSlice.reducer;
