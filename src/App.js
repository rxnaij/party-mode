// eslint-disable-next-line
import React, { Component, useState, useEffect } from 'react';
// import 'reset-css';
import './App.css';

// Components
//    Screens
import AddSongs from './AddSongs';
//    Individual components
import ModalShade from './components/ModalShade';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faPlus, faHands, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faPlus, faHands, faTimes, faSearch )

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

const inlineBlockStyle = {
  display: 'inline-block',
  marginRight: '1rem'
};

/*
 * Displays total count of a given value
 * props:
 * name: name of value
 * value: value to be counted
 */ 
const TotalCounter = props => {
  const style = {
    display: 'inline-block',
    marginRight: '1rem'
  }
  return (
    <div style={style}>
      {'Total ' + props.name + ': ' + props.value}
    </div>
  );
};

/*
 * A user profile avatar. When clicked, sets user as current user in parent component.
 * props:
 * user: the user represented on this profile
 * setAsCurrentUser: sets user as current user in app
 */ 
const Profile = props => {
  return(
    <div
      key={props.user.id}
      onClick={() => props.setAsCurrentUser()}
    >
      {props.user.name}: {props.user.songs.length}
    </div>
  )
};

/*
 * Modal prompting new user to be added to list of users in parent.
 * props:
 * users: list of all users in parent component
 * addUser(): adds new user to parent component
 * close(): removes Modal from parent component
 */ 
const AddNewUserModal = props => {

  return(
    <ModalShade close={props.close} >
      <form>
        <label to="newUserName">Add new collaborator:</label>
        <input type="text" name="newUserName" id="newUserName"/>
        <button onClick={ () => props.close() }>
          Cancel
        </button>
        <button onClick={() => {
          if (document.getElementById('newUserName').value) {
            const users = props.users;
            const newUser = {
              name: document.getElementById('newUserName').value,
              id: users.length + 1,
              songs: []
            }
            props.addUser(newUser);
            props.close();
          }
        }}>
          Add
        </button>
      </form>
    </ModalShade>
  )
};

/* SONG SLOTS */

/*
 * Higher-order styling component for song slots
 */
const SongSlot = props => {
  const songSlotStyle = {
    border: '1px solid black',
    borderRadius: '8px',
    maxWidth: '70%',
    margin: '0 auto'
  };

  return(
    <div style={songSlotStyle}>
      {props.children}
    </div>
  );
};

/*
 * A slot containing a song
 * props:
 * song: song data for this slot
 */
const FilledSongSlot = props => {
  return(
    <SongSlot>
      <input type="checkbox" name="" id="" style={ inlineBlockStyle } />
      <div style={ inlineBlockStyle }>
        <h5>{props.song.name}</h5>
        <h6>{props.song.artist}</h6>
      </div>
      <button>Preview</button>
    </SongSlot>
  )
};

/*
 * An empty song slot that can be occupied by song data or traded to another user.
 * props:
 * openModal(): opens DonateSlotModal in parent component
 * TODO: add add song functionality
 */
const EmptySongSlot = props => {

  return(
    <SongSlot>
      <button style={ inlineBlockStyle }>
        <FontAwesomeIcon icon={faPlus} />
        <span>Add song</span>
      </button>
      <button 
        style={ inlineBlockStyle }
        onClick={ () => props.openModal() }
      >
        <FontAwesomeIcon icon={faHands} />
        <span>Donate slot to friend</span>
      </button>
    </SongSlot>
  )
};

/* 
 * Modal for user-to-user song slot exchange.
 * props:
 * users: array of all users
 * currentUser: currently represented-user in parent component
 * close(): removes modal from parent component
 * donateSongSlot(): removes one song slot from user and adds a song slot to another
*/
const DonateSlotModal = props => {
  return(
    <ModalShade close={props.close} >
      <button onClick={() => props.close()}>
        Close
      </button>
      <h3>Select the user you would like to give a slot to.</h3>
      <ul>
      {props.users.map(user => 
          <li 
            key={`donate-to-${user.id}`}
            onClick={() => {
              if (props.currentUser !== user) {
                props.donateSongSlot(props.currentUser, user);
                // TODO: send notification popup
                props.close()
              }
            }}
          >
            <p>{user.name}</p>
          </li>
        )}
      </ul>
    </ModalShade>
  )
};

/*
 * Container for multiple SongSlots.
 *
 * props:
 * songs: list of a user's songs
 * slots: starting limit for songs per user
 * setDonateSlotModal(): activates DonateSlotModal in parent component
 * 
 * Notes:
 * **Potential new logic:
 * Create an array with $songLimit number of EmptySongSlots
 * find() EmptySongSlots
 * Remove (or replace?)
*/
const SongWrapper = props => {
  /* Fills an array with FilledSongSlots for each song
     that a user has already added.
     Then EmptySongSlots are added to the array until 
     the array's length becomes equal to songLimit. 
  */
  const slotsToRender = props.songs.map((song, i) =>
    <FilledSongSlot key={`filledslot-${song.name}-${i}`} song={song} />
  );
  for (let i = 0; i < props.slots - props.songs.length; i++) {
    slotsToRender.push(
      <EmptySongSlot
        openModal={props.openModal}
    />);
  }

  return(
    <div>
      { slotsToRender }
    </div>
  );
};

// App component
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        ...fakeData.users.map(user => ({
          ...user,
          slots: 0
        }))
      ],
      /* Component visibility triggers */
      allUsersVisible: false,
      addUserModalIsVisible: false,
      donateSlotModalIsVisible: false,
    }
    // Binding state helper functions
    this.checkForExistingSongOwner = this.checkForExistingSongOwner.bind(this);
    this.addUser = this.addUser.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.setAddUserModal = this.setAddUserModal.bind(this);
    this.addSong = this.addSong.bind(this);
    this.setDonateSlotModal = this.setDonateSlotModal.bind(this);
    this.donateSongSlot = this.donateSongSlot.bind(this);
  }

  /*
   * Helper method that finds whether a song exists inside
   * a given user's songs[] property
   * 
   * Returns the matching user (if it exists)
   */ 
  checkForExistingSongOwner(song) {
    const { name, artist } = song // only extracts name and type because those are the only
                                  // truly necessary properties--songs that share the
                                  // same name can usually be differentiated by their artist.
    return this.state.users.find(user =>
      user.songs.find(currentTrack => 
        currentTrack.name === name &&
        currentTrack.artist === artist
      )
    ) || null
  }

  /*
   * Adds a new user Object to the list of users in state
   * newUser: user to add
   */
  addUser(newUser){
    const updatedUsers = this.state.users;
    updatedUsers.push(newUser);
    this.setState({
      users: updatedUsers
    })
  }

  /*
   * Sets the current user displayed in the app
   * user: user to be displayed
   */ 
  setCurrentUser(user) {
    this.setState({
      currentUser: user
    })
  }

  /*
   * Toggles how many Profiles are rendered
   */
  toggleAllUsersList() {
    const toggle = !this.state.allUsersVisible
    this.setState({
      allUsersVisible: toggle
    })
  }

  /*
   * Adds or removes AddUserModal
   * isVisible: whether AddUserModal is active
   */ 
  setAddUserModal(isVisible) {
    this.setState({
      addUserModalIsVisible: isVisible
    });
  }

  /*
   * Adds a song to the current user's slots.
   * song: song to be added
   */
  addSong(song) {
    if (this.state.songLimit > this.state.currentUser.songs.length) {
      const updatedSongs = this.state.currentUser.songs;
      updatedSongs.push(song)
      this.setState((state) => ({
        currentUser: {
          ...state.currentUser,
          songs: updatedSongs
        }
      }));
    } else {
      throw new Error(`You've already reached the limit of ${this.state.songLimit} songs. You'll need to receive a song slot donation from another user in order to add more songs.`)
    }
  }

  /*
   * Adds or removes DonateSlotModal
   * isVisible: whether setDonateSlotModal is active
   */ 
  setDonateSlotModal(isVisible) {
    this.setState({
      donateSlotModalIsVisible: isVisible
    });
  }
  
  /*
   * Takes one empty song slot from donor and gives one empty
   * song slot to recipient
   * donor: user to give one empty song slot
   * recipient: user to receive one empty song slot
  */
  donateSongSlot(donor, recipient) {
    const emptySlots = donor.slots - donor.songs.length;
    if (emptySlots < 1) throw new Error(`${donor.name} doesn't have any more slots to give.`);
    const updatedDonor = this.state.users.find(user => user === donor);
    updatedDonor.slots--;
    const updatedRecipient = this.state.users.find(user => user === recipient);
    updatedRecipient.slots++;
    this.setState({
      updatedDonor,
      updatedRecipient
    });
  }

  // Grouping callbacks
  addSongCallbacks() {
    return {
      addSong: this.addSong,
      checkForExistingSongOwner: this.checkForExistingSongOwner
    }
  }

  componentDidMount() {
    // Fake initial data-loading for now
    // Adds new states
    const songs = 5;
    this.setState(state => ({
      users: state.users.map(user => ({
        ...user,
        slots: 5
      }))
    }));
    this.setState((state, props) => ({
      currentUser: state.users.find( (user) => user.name === 'Michael'),
      songLimit: songs,
    }));
  }

  render(){
    // Data check (for debugging)
    this.state.currentUser && console.log(this.state.currentUser);
    // Total stats of all users
    const totalUsers = this.state.users.length;
    const totalSongs = this.state.users.reduce(
      (sumSongs, user) => sumSongs += user.songs.length
      , 0);
    // "All" songs for "All" profile
    const allUsers = {
      name: 'All',
      id: -1,
      songs: this.state.users.reduce( (list, user) => list.concat(user.songs), []), // Translation: "Turn data.users into a list, and for each user, append their collection of songs to the list."
      slots: this.state.songLimit * this.state.users.length
    }
    // Components to render
    const usersToRender = this.state.allUsersVisible
      ? totalUsers
      : 4;

    return (
      <div className="App">
        <h1>Richard's Party Playlist</h1>
        <h2>Add Songs</h2>
        <TotalCounter name="Users" value={totalUsers} />
        <TotalCounter name="Songs" value={totalSongs} />

        <div id="SongWrapperComponent">
          <h3>Adding songs as: </h3>
          <button onClick={ () => this.toggleAllUsersList() }>
            { this.state.allUsersVisible ? 'Show less' : 'Show all' }
          </button>
          {/* "ALL" Profile Component */}
          <Profile 
            user={allUsers}
            currentUser={this.state.currentUser}
            setAsCurrentUser={this.setCurrentUser}
          />
          {
            this.state.users.slice(0, usersToRender).map(user =>
              <Profile 
                key={`profile+${user.id}`}
                user={user}
                setAsCurrentUser={() => this.setCurrentUser(user)}
              />
            )
          }
          {/* User Profile Components */}
          <button onClick={() => this.setAddUserModal(true)}><FontAwesomeIcon icon={faPlus} /> Add new collaborator</button>
          {
            this.state.addUserModalIsVisible &&
            <AddNewUserModal
              users={this.state.users}
              addUser={this.addUser}
              close={() => this.setAddUserModal(false)}
            />
          }
        </div>

        <h3>Your songs</h3>
        {
          this.state.currentUser ?
          <div>
            <strong>Current user: { this.state.currentUser.name }</strong>
            <h4>{ this.state.currentUser.songs.length }/{ this.state.currentUser.slots ? this.state.currentUser.slots : this.state.songLimit } songs added</h4>
            <SongWrapper 
              songs={this.state.currentUser.songs} 
              slots={this.state.currentUser.slots}
              openModal={() => this.setDonateSlotModal(true)}
            />
            {
              this.state.donateSlotModalIsVisible &&
              <DonateSlotModal 
                users={this.state.users}
                currentUser={this.state.currentUser}
                donateSongSlot={this.donateSongSlot}
                close={() => this.setDonateSlotModal(false)}
              />
            }
          </div> :
          <div>Loading...</div>
        }

        <hr/>
        <AddSongs
          currentUser={this.state.currentUser}
          addSongCallbacks={this.addSongCallbacks()}
        />

      </div> // End .App
    );
  }
}

export default App;
