import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactInitState } from './contacts.init-state';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactInitState,
  reducers: {
    contactsSearchAction: (state, { payload }) => {      
      state.filter = payload;
    },

    deleteContactsAction: (state, { payload }) => {     
      state.data = state.data.filter(contact => contact.id !== payload);
    },

    setInContacts:(state, { payload }) => {      
      state.data = [...state.data, payload];    
    }
  },
});

export const { contactsSearchAction, deleteContactsAction,setInContacts} = contactSlice.actions;

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['data'],  
};

export const contactReducer = persistReducer(persistConfig, contactSlice.reducer);