import React from 'react'
import ModalShade from './ModalShade'

const FilledSlotIcon = () => (
  <div className="slot-icon filled-slot-icon">
  </div>
);

const EmptySlotIcon = () => (
  <div className="slot-icon empty-slot-icon">
  </div>
);

const ToDonateSlotIcon = () => (
  <div className="slot-icon to-donate-slot-icon">
  </div>
)

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

  const DonateSlots = props => {
    const { id, name, slots, songs, isCurrentUser } = props;

    const slotsToRender = () => {
      const slotIcons = songs.map((song, i) => <FilledSlotIcon key={`${id}-filled-slot-icon-${i}`} />);
      for (let i = songs.length; i < slots; i++) {
        if (isCurrentUser && i === slots - 1) {
          slotIcons.push(<ToDonateSlotIcon key={`${id}-empty-slot-icon-${i}`} />)
        } else {
          slotIcons.push(<EmptySlotIcon key={`${id}-empty-slot-icon-${i}`} />)
        }
      }
      return slotIcons;
    }
      
    return(
      <div className="donation">
        <span>{name}</span>
        <div className="donate-slot-icon-container" style={{ marginBottom: isCurrentUser ? '0.5rem' : '3rem' }}>
          {slotsToRender()}
          <div>{songs.length}/{slots} slots filled</div>
        </div>
      </div>
    )
  }

  return(
    <ModalShade close={close} >
      <h3>Select the user you would like to give a slot to.</h3>
      <DonateSlots id={currentUser.id} name={currentUser.name} slots={currentUser.slots} songs={currentUser.songs} isCurrentUser={true}/>
      <ul>
        {
          users.filter(user => user.id !== currentUser.id).map(user => 
            <li 
              key={`donate-to-${user.id}`}
              style={{
                marginBottom: '0.5rem',
                // backgroundColor: 'hsla(149, 37%, 100%, 0.5)',
              }}
              onClick={() => {
                donateSongSlot(currentUser, user);

                // TODO: send notification popup

                close()
              }}
            >
              <DonateSlots id={user.id} name={user.name} slots={user.slots} songs={user.songs} isCurrentUser={false} />
            </li>
          )
        }
      </ul>
      <button className="primary full-width" onClick={() => close()}>
        Done
      </button>
    </ModalShade>
  )
};