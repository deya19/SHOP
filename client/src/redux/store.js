import {configureStore,combineReducers} from "@reduxjs/toolkit"
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"
import registerReducer from "./registerRedux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({user:userReducer,cart:cartReducer,register:registerReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)  // to not lose any thing when refresh

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);