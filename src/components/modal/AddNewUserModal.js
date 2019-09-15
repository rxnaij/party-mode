import React from 'react';
import ModalShade from './ModalShade'

/*
 * Modal prompting new user to be added to list of users in parent.
 * props:
 * users: list of all users in parent component
 * addUser(): adds new user to parent component
 * close(): removes Modal from parent component
 */ 
export default function AddNewUserModal (props) {

  const { users, addUser, initialSlots, close } = props;

  return(
    <ModalShade close={close} >
      <form>
        <label to="newUserName">Add new collaborator:</label>
        <input type="text" name="newUserName" id="newUserName"/>
        <button className="primary full-width" onClick={() => {
          if (document.getElementById('newUserName').value) {
            
            const newUser = {
              name: document.getElementById('newUserName').value,
              id: users.length + 1,
              songs: [],
              slots: initialSlots
            };

            addUser(newUser);
            close();

          }
        }}>
          Add
        </button>
        <button className="secondary full-width" onClick={ () => close() }>
          Cancel
        </button>
      </form>
    </ModalShade>
  )
};