import { createSlice } from "@reduxjs/toolkit";


let initialState = {
  data: [],
  loading: false,
  error: null,
}

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    initEvents: (state, action) => {
      state.data = action.payload;
      return state;
    },
    addEvent: (state, action) => {
      state.data.push(action.payload);
    },
    delEvent: (state, action) => {
      state.data = state.data.filter(el => el._id !== action.payload.id);
    },
    addVendorsList: (state, action) => {
      state.data = state.data.map(el => el._id === action.payload.updatedEvent._id ? action.payload.updatedEvent : el);
    },
    clearAll: (state) => {
      state.data = [];
      return state;
    }
  },
})


export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
