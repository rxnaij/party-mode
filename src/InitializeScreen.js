import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InitializeScreen (props) {

  const { backToApp, setPlaylistName, setInitialSlots, setEqualizedShuffle, addUser } = props.initializeCallbacks;

  const [playlistName_input, setPlaylistName_input] = useState('');
  const [initialSlots_input, setInitialSlots_input] = useState(5);
  const [eqShuffle_input, setEqShuffle_input] = useState('');
  const [userInput, setUserInput] = useState('');
  const [usersToAdd, setUsersToAdd] = useState([]);

  useEffect(
    () => {
      setUsersToAdd([
        { name: 'Richard' },
        { name: 'Julian' }
      ])
    },
    []
  )

  return(
    <div className="InitializeScreen">
      <div className="section-divider"></div>
      <h1>Start Party Playlist</h1>
      <h2>You're creating a new party playlist!</h2>
      <div className="section-divider"></div>
      <form className="form">
        <div className="form-section text-input">
          <label htmlFor="name">Name of playlist</label>
          <label htmlFor="name">{playlistName_input.length}/100</label>
          <input type="text" name="playlist-name" id="" maxLength="100" required onChange={event => setPlaylistName_input(event.target.value)}/>
        </div>
        <div className="form-section number-input">
          <label htmlFor="initial-slots">Starting slots</label>
          <p className="helper-text">Each user can add this many songs.</p>
          <input type="number" name="initial-slots" id="" defaultValue="5" min="1" required onChange={event => setInitialSlots_input(event.target.value)}/>
        </div>
        <div className="form-section">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <label htmlFor="equalized-shuffle">Use Equalized Shuffle?</label>
            <input type="checkbox" name="equalized-shuffle" id="" onChange={event => setEqShuffle_input(event.target.value)}/>
          </div>
          <p className="helper-text">Equalized Shuffle organizes the playlist's songs such that everyone's songs are guaranteed to play in a randomly selected order.</p>
        </div>
        <div className="form-section">
          <label htmlFor="add-user">Add playlist contributors:</label>
          <ul style={{
            fontSize: '0.875rem'
          }}>
          {
            usersToAdd.length > 0 && usersToAdd.map((user, i) =>
              <li 
                key={`userToAdd-${user.name}-${i}`} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0'
                }}
                
              >
                <div>
                  {user.name}
                </div>
                <div>
                  <FontAwesomeIcon
                    icon="times" 
                    onClick={() => 
                      setUsersToAdd(usersToAdd.filter(userToDelete => 
                        userToDelete.name !== user.name))
                    } 
                  />
                </div>
              </li>
            )
          }
          </ul>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input 
              type="text" 
              name="add-user" 
              id="" 
              placeholder="Enter the name of a user to add" 
              value={userInput} 
              onChange={event => setUserInput(event.target.value)}
            />
            <button onClick={event => {
              event.preventDefault();
              userInput && setUsersToAdd([...usersToAdd, { name: userInput }]);
              setUserInput('');
            }}>
              Add user
            </button>
          </div>
        </div>
        <div className="section-divider"></div>
        <button 
          className="primary" 
          onClick={() => {
            setPlaylistName(playlistName_input);
            setInitialSlots(initialSlots_input);
            setEqualizedShuffle(eqShuffle_input === 'on' ? true : false);
            usersToAdd.map((user, i) => addUser({
              name: user.name,
              id: i,
              songs: [],
              slots: initialSlots_input
            }));
            backToApp();
         }}>
          Start adding songs!
        </button>
      </form>
    </div>
  )
}