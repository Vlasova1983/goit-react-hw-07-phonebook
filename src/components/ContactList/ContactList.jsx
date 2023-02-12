import styles  from '../ContactList/ContactList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact} from "../../redux/contacts/operetions";

import { getContacts } from "../../redux/contacts/contacts.selectors";
import { getFilter } from '../../redux/filter/filter.selector';

export const ContactList = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);
    const data = useSelector(getContacts);    

    const  getFilterContact =()=> {       
      return data.filter((contact)=>contact.name.toLowerCase().includes(filter));
    };
      
    const contacts=getFilterContact();  

    const handleDelete = (id)=> {        
      dispatch(deleteContact(id.target.name));    
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

  
  
  
  
 
  