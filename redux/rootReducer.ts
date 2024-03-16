import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistStorage={
  key:"user",
  storage:storage
}
// import slices
import userSliceReducer from './slices/userSlice';

const rootReducer = combineReducers({
    user: persistReducer(persistStorage,userSliceReducer),
});

export default rootReducer;