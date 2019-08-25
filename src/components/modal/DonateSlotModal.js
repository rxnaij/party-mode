import React from 'react'
import ModalShade from './ModalShade'

/* 
 * Modal for user-to-user song slot exchange.
 * props:
 * users: array of all users
 * currentUser: currently represented-user in parent component
 * close(): removes modal from parent component
 * donateSongSlot(): removes one song slot from user and adds a song slot to another
*/
export default function DonateSlotModal (props) {

  const { users, currentUser, close, donateSongSlot } = props;

  return(
    <ModalShade close={close} >
      <button onClick={() => close()}>
        Close
      </button>
      <h3>Select the user you would like to give a slot to.</h3>
      <ul>
        {
          users.map(user => 
            <li 
              key={`donate-to-${user.id}`}
              style={{
                maxWidth: '10rem',
                margin: '0 auto',
                marginBottom: '0.5rem',

                borderRadius: '1rem',
                backgroundColor: 'hsla(149, 37%, 100%, 0.5)',

                textAlign: 'center',
                lineHeight: '2.5rem'
              }}
              onClick={() => {
                if (currentUser !== user) {

                  donateSongSlot(currentUser, user);

                  // TODO: send notification popup

                  close()
                }
              }}
            >
              <p>{user.name}</p>
            </li>
          )
        }
      </ul>
    </ModalShade>
  )
};