import styles  from './App.module.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../redux/contacts/operetions";

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';


import { getError, getIsLoading } from "../redux/contacts/contacts.selectors";

export const App  =()=> {  
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div className={styles.conteiner}>
      <h1>Phonebook</h1>
        <ContactForm/>
      <h2>Contacts</h2>      
        <Filter/> 
       {isLoading && !error && <b>Request in progress...</b>}      
        <ContactList/>               
    </div>
  );     
};
