import styles  from '../ContactForm/ContactForm.module.css';

import {useState} from "react";

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from "../../redux/contacts/operetions";
import { getContacts} from "../../redux/contacts/contacts.selectors";

const getRandomID=()=> {
  return `${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const ContactForm =()=> { 
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const [name,setInName] = useState(''); 
  const [number,setInNumber] = useState('');

  const handleChange = event => {    
    const { name, value } = event.target;    
    name==='name'?setInName(value):setInNumber(value);      
  };

  const isContactInState = ({ name }) =>
  !!contacts.filter(({name: prevName}) => {return prevName === name}).length;

  const onSubmit = ({ name, number }) => { 
    if (isContactInState({ name })) {
      alert('Contact is in phonebook');
      return;    
    }   
    
    dispatch(
      addContact(
        {id:getRandomID(), name, number }   
      ), 
    );         
  };

  const handleFormSubmit = evt => {   
    evt.preventDefault();    
    onSubmit({ name, number });
    setInName('');
    setInNumber('');   
  }; 
   
  return (
    <form className={styles.contact_form} onSubmit={ handleFormSubmit}>
      <div className="">
        <label htmlFor="name" className="">
            <p>Name</p>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          placeholder="Search name..."
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className="">
        <label htmlFor="number" className="">
          <p>Number</p>
        </label>
        <input
          id="number"
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
          placeholder="000-00-00"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>     

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>      
  );    
}

