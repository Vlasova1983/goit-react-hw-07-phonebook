import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { contactInitState } from './contacts/contacts.init-state';
import { contactReducer } from './contacts/contacts.slice';

const initState = { 
 contacts: contactInitState,
};

export const store = configureStore({
  preloadedState: initState,
  devTools: true,
  reducer: {    
    contacts: contactReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);