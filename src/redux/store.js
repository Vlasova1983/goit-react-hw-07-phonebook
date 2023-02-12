import { configureStore } from '@reduxjs/toolkit';
import {  
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { contactInitState } from './contacts/contacts.init-state';
import { contactsReducer } from '../redux/contacts/contacts.slice';
import { filterReducer } from './filter/filter.slice';
import { filterInitState } from './filter/filter.init-state';

const initState = { 
  contacts: contactInitState.contacts,
  filter:filterInitState,
};

export const store = configureStore({
  preloadedState: initState,
  devTools: true,
  reducer: {    
    contacts: contactsReducer, 
    filter: filterReducer,    
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

