import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user:{},
    allUser:<any>[]
  };

const userSlice = createSlice({
    name: "users", // Name of the slice
    initialState, // Initial state
    reducers: {
      // Reducer for updating cardDetails after a successful resource fetch
      setUserss: (state, action) => {
        return {...state, user: action.payload};
      },
      setAllUser: (state, action) => {
        return {...state, allUser: action.payload};
      },
    },
  });

  // Export the action creator for getResourcesSuccess
export const { setUserss,setAllUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;