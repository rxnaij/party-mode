import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Fake server data
const fakeData = {
  users: [
    {
      name: 'Andrew',
      id: 0,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'Let it Go',
          artist: 'Frozen'
        }
      ]
    },
    {
      name: 'Steven',
      id: 1,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'Satellite Mind',
          artist: 'Metric'
        },
        {
          type: 'track',
          imageURL: '',
          name: 'Lonely Boy',
          artist: 'The Black Keys'
        }
      ]
    },
    {
      name: 'Julia',
      id: 2,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: "Can't Stop Us",
          artist: 'Macklemore'
        }
      ]
    },
    {
      name: 'Quin',
      id: 3,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'i',
          artist: 'Kendrick Lamar'
        },
        {
          type: 'track',
          imageURL: '',
          name: 'Time',
          artist: 'Pink Floyd'
        }
      ]
    },
    {
      name: 'Christina',
      id: 4,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'Take A Chance On Me',
          artist: 'ABBA'
        }
      ]
    },
    {
      name: 'Richard',
      id: 5,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'Sad Valentine',
          artist: 'No Vacation'
        }
      ]
    },
    {
      name: 'Rosie',
      id: 6,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'Seoul Town Road',
          artist: 'BTS'
        }
      ]
    },
    {
      name: 'Keeling',
      id: 7,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'Kids',
          artist: 'MGMT'
        }
      ]
    },
    {
      name: 'Michael',
      id: 8,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: 'La vie en rose',
          artist: 'Louie Armstrong'
        },
        {
          type: 'track',
          imageURL: '',
          name: 'Sin Triangle',
          artist: 'Sidney Gish'
        }
      ]
    },
    {
      name: 'Sophia',
      id: 9,
      songs: [
        {
          type: 'track',
          imageURL: '',
          name: "Friday I'm In Love",
          artist: 'Janet Devlin'
        }
      ]
    }
  ]
}

export default function InitializeScreen (props) {

  const { backToApp, setPlaylistName, setInitialSlots, addUser } = props.initializeCallbacks;

  const [playlistName_input, setPlaylistName_input] = useState(null);
  const [initialSlots_input, setInitialSlots_input] = useState(5);
  const [userInput, setUserInput] = useState('');
  const [usersToAdd, setUsersToAdd] = useState([]);

  // useEffect(
  //   () => {
  //     setUsersToAdd([
  //       { name: 'Richard' },
  //       { name: 'Julian' }
  //     ])
  //   },
  //   []
  // )

  return(
    <div className="InitializeScreen">
      <div className="section-divider"></div>
      <h1>Start Party Playlist</h1>
      <h2>You're creating a new party playlist!</h2>
      <div className="section-divider"></div>
      <form className="form">
        <div className="form-section text-input">
          <label htmlFor="name">Name of playlist</label>
          {playlistName_input && <label htmlFor="name"className="helper-text">{playlistName_input.length}/100 characters</label>}
          <input type="text" name="playlist-name" id="" maxLength="100" required onChange={event => setPlaylistName_input(event.target.value)}/>
          {
            (!playlistName_input && playlistName_input === '') && <p className="helper-text">You must enter a name for your playlist!</p>
          }
        </div>
        <div className="form-section number-input">
          <label htmlFor="initial-slots">Starting slots</label>
          <p className="helper-text">Each user can add this many songs.</p>
          <input type="number" name="initial-slots" id="" defaultValue="5" min="1" required onChange={event => setInitialSlots_input(event.target.value)}/>
        </div>
        <div className="form-section">
          <label htmlFor="add-user">Add playlist contributors:</label>
          <p className="helper-text">You can also add more users once you've started adding songs.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input 
              type="text" 
              name="add-user" 
              id="" 
              placeholder="Name of contributor" 
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
        </div>
        <div className="section-divider"></div>
        <button 
          className="primary" 
          onClick={() => {
            setPlaylistName(playlistName_input);
            setInitialSlots(initialSlots_input);
            // fakeData.users.map((user, i) => addUser({
            //   name: user.name,
            //   id: i,
            //   songs: [],
            //   slots: initialSlots_input
            // }));
            usersToAdd.map((user, i) => addUser({
              name: user.name,
              id: i,
              songs: [],
              slots: initialSlots_input
            }))
            backToApp();
         }}>
          Start adding songs!
        </button>
      </form>
    </div>
  )
}