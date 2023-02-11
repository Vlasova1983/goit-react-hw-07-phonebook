import styles  from '../ContactList/ContactList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {deleteContactsAction} from '../../redux/contacts/contacts.slice';

export const ContactList = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.contacts.filter);
    const data = useSelector(state => state.contacts.data);  
    
    const  getFilterContact =()=> {    
        return data.filter((contact)=>contact.name.toLowerCase().includes(filter));
    };
    
    const contacts = getFilterContact();       
  
    const handleDelete = (id)=> {
        
      dispatch(deleteContactsAction(id.target.name));    
    };
  
    return (
        <div className={styles.contact_list}>            
            {contacts.map(contact=>( 
                <div key={contact.id} className={styles.link}>
                  <li> {contact.name} : {contact.number}</li> 
                  <button name ={contact.id} className={styles.button} onClick={handleDelete}>Delete</button>
                </div>           
            ))}         
        </div>            
    );
  };

  
  
  
  
 
  