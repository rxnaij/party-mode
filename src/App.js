// eslint-disable-next-line
import React, { Component, useState, useEffect } from 'react';
import 'reset-css';
import './App.css';

// Components
//    Screens
import AddSongsScreen from './AddSongsScreen';
//    Individual components
import ModalShade from './components/modal/ModalShade';
import DonateSlotModal from './components/modal/DonateSlotModal';
import Tooltip from './components/Tooltip';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faPlus, faHands, faTimes, faSearch, faAngleUp, faAngleDown, faPlayCircle, faUser, faMusic, faChevronRight } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faPlus, faHands, faTimes, faSearch, faAngleUp, faAngleDown, faPlayCircle, faUser, faMusic, faChevronRight);

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

/*
 * Displays total count of a given value
 * props:
 * name: name of value
 * value: value to be counted
 */ 
const TotalCounter = props => {

  const { name, icon, value } = props;

  const [tooltipIsVisible, setTooltip] = useState(false);

  const style = {
    display: 'inline-block',
    marginRight: '1rem',
  }

  const selected = {
    backgroundColor: 'gray'
  }

  return (
    <div style={style}>
      <div style={tooltipIsVisible ? selected : null}>
        {
          icon
            ? <FontAwesomeIcon 
                icon={icon} 
                style={{marginRight: '0.25rem'}} 
                onClick={() => setTooltip(!tooltipIsVisible)}
              /> 
            : `Total ${name}:`
        }
        {value}
      </div>
      <div style={{position: 'relative'}}>
        {
          tooltipIsVisible &&
          <Tooltip close={() => setTooltip(false)}>
            Total {name} in this playlist
          </Tooltip>
        }
      </div>
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

  const { user, isCurrentUser, setAsCurrentUser } = props;

  const profileStyle = {
    paddingBottom: '0.5rem',

    textAlign: 'center',
    fontSize: '0.75rem',
    cursor: 'pointer'
  }

  const isCurrentUserStyle = {
    ...profileStyle,
    fontWeight: 'bold',
    boxShadow: '0px 2px #0DC181'
  }

  const profileImgStyle = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',

    margin: '0 auto',
    marginBottom: '0.25rem',

    backgroundColor: isCurrentUser ? '#A1FFCF' : 'lightgray',
    color: 'black',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: '1rem',
    textAlign: 'center'
  }

  return(
    <div
      key={user.id}
      style={isCurrentUser ? isCurrentUserStyle : profileStyle}
      onClick={() => setAsCurrentUser()}
    >
      <div style={profileImgStyle}>
        {user.name[0]}
      </div>
      <div>
        {user.name}
      </div>
      <div>
        {user.songs.length}
      </div>
    </div>
  )
};

const ProfileRow = props => {

  const { profiles, currentUser, setAsCurrentUser } = props;

  const profileRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: '1rem'
  }
  
  return(
    <div
      style={profileRowStyle}
    >
      {
        profiles.map(user =>
          <Profile 
            key={`profile+${user.id}`}
            user={user}
            isCurrentUser={currentUser === user}
            setAsCurrentUser={() => setAsCurrentUser(user)}
          />
        )
      }
    </div>
  )
}

/*
 * Modal prompting new user to be added to list of users in parent.
 * props:
 * users: list of all users in parent component
 * addUser(): adds new user to parent component
 * close(): removes Modal from parent component
 */ 
const AddNewUserModal = props => {

  const { users, addUser, close } = props;

  return(
    <ModalShade close={close} >
      <form>
        <label to="newUserName">Add new collaborator:</label>
        <input type="text" name="newUserName" id="newUserName"/>
        <button onClick={ () => close() }>
          Cancel
        </button>
        <button onClick={() => {
          if (document.getElementById('newUserName').value) {
            
            const newUser = {
              name: document.getElementById('newUserName').value,
              id: users.length + 1,
              songs: []
            };

            addUser(newUser);
            close();

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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    border: '2px solid gray',
    borderRadius: '8px',

    maxWidth: '720px',
    minHeight: '60px',
    margin: '0 auto',
    marginBottom: '0.5rem',

    padding: '0.75rem 1rem'
  };

  return(
    <div style={{...songSlotStyle, ...props.style}}>
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

  const { song, triggerRemoveSongsPopup } = props;

  const [isSelected, setIsSelected] = useState(false);

  const filledSongSlotStyle = {
    fontSize: '0.9rem',
    border: '0px',

    color: 'white',
    backgroundImage: 'linear-gradient(to right top, #207155, #1c9068, #14b07a, #08d18c, #00f39d)'
  }

  const artists = song.artists ? song.artists.reduce((artistList, artist) => 
                    artistList.concat(artist.name)
                  , []).join(', ') : null;

  return(
    <SongSlot style={filledSongSlotStyle}>
      <div>
        <input 
          type="checkbox" name="" className="song-checkbox" id="" 
          onClick={event => {
            setIsSelected(event.target.checked)
            triggerRemoveSongsPopup()
          }}
        />
      </div>
      
      <div
        style={{
          flexGrow: '2',
          paddingLeft: '1.25rem'
        }}
      >
        <h5>{song.name}</h5>
        <h6>{song.artist || artists}</h6>
      </div>
      <div>
       <FontAwesomeIcon icon="play-circle" />
      </div>
      
    </SongSlot>
  )
};

/*
 * An empty song slot that can be occupied by song data or traded to another user.
 * props:
 * openModal(): opens DonateSlotModal in parent component
 * moveToAddSongsScreen(): switches App to AddSongsScreen
 * TODO: add add song functionality
 */
const EmptySongSlot = props => {

  const { openModal, moveToAddSongsScreen } = props;

  const emptySongSlotStyle = {
    border: '2px solid gray',

    boxShadow: 'inset 0px 4px 8px hsla(0, 0%, 0%, 0.35)'
  }

  return(
    <SongSlot
      style={emptySongSlotStyle}
    >
      <button 
        onClick={() => moveToAddSongsScreen()}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Add song</span>
      </button>
      <button 
        onClick={() => openModal()}
      >
        <FontAwesomeIcon icon={faHands} />
        <span>Donate slot to friend</span>
      </button>
    </SongSlot>
  )
};

/*
 * Container for multiple SongSlots.
 *
 * props:
 * songs: list of a user's songs
 * slots: starting limit for songs per user
 * openModal(): activates DonateSlotModal in parent component
 * moveToAddSongsScreen(): switches parent display from App to AddSongsScreen
 * 
 * Notes:
 * **Potential new logic:
 * Create an array with $songLimit number of EmptySongSlots
 * find() EmptySongSlots
 * Remove (or replace?)
*/
const SongWrapper = props => {

  const { songs, slots, openModal, moveToAddSongsScreen } = props;

  const [removeSongsPopup, setRemoveSongsPopup] = useState(false);

  /* Fills an array with FilledSongSlots for each song
     that a user has already added.
     Then EmptySongSlots are added to the array until 
     the array's length becomes equal to songLimit. 
  */
  const slotsToRender = songs.map((song, i) =>
    <FilledSongSlot
      key={`filledslot-${song.name}-${i}`}
      order={i}
      song={song}
      triggerRemoveSongsPopup={() => {setRemoveSongsPopup(!removeSongsPopup); console.log('new value: ', removeSongsPopup)}}
    />
  );
  for (let i = 0; i < slots - songs.length; i++) {
    slotsToRender.push(
      <EmptySongSlot
        key={`emptyslot-${i}`}
        openModal={openModal}
        moveToAddSongsScreen={moveToAddSongsScreen}
      />
    );
  }

  return(
    <div>
      <fieldset>
        { slotsToRender }
      </fieldset>
      <div>
        {
          removeSongsPopup && 
          <div style={{
            backgroundColor: 'gray',
            position: 'fixed',

            bottom: 0,
            left: 0,
            right: 0,
            height: '3rem'
          }}>
            Remove songs?
            <button>
              Cancel
            </button>
          </div>
        }
        
      </div>
    </div>
  );
};

// App component
export default class App extends Component {
  constructor() {
    super();
    this.state = {

      users: [
        ...fakeData.users.map(user => ({
          ...user,
          slots: 0
        }))
      ],

      /* Login check (temporary placeholder) */
      accessToken: null,

      /* Screen visibility triggers */

      screens: ['App', 'AddSongsScreen'],
      currentScreen: 'App',

      /* Component visibility triggers */

      allUsersVisible: false,
      addUserModalIsVisible: false,
      donateSlotModalIsVisible: false,
    }

    // Binding state helper methods
    this.setCurrentScreen = this.setCurrentScreen.bind(this);
    this.checkForExistingSongOwner = this.checkForExistingSongOwner.bind(this);
    this.addUser = this.addUser.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.setAddUserModal = this.setAddUserModal.bind(this);
    this.addSong = this.addSong.bind(this);
    this.removeSong =  this.removeSong.bind(this);
    this.setDonateSlotModal = this.setDonateSlotModal.bind(this);
    this.donateSongSlot = this.donateSongSlot.bind(this);
  }

  /*
   * Navigates to specified screen
   * screen must be a string of
   * 'App' or 'AddSongsScreen'
   */ 
  setCurrentScreen (screen) {

    this.setState({
      currentScreen: screen
    });

  }

  /*
   * Helper method that finds whether a song exists inside
   * a given user's songs[] property
   * 
   * Returns the matching user (if it exists)
   */ 

  checkForExistingSongOwner (song) {
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
  addUser (newUser) {

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
  setCurrentUser (user) {

    this.setState({
      currentUser: user
    });

    // Moves user to beginning of user list
    // (doesn't add "All" user to list)
    if (user.name !== 'All') {
      
      let userList = [...this.state.users.filter(item => item !== user)];
      userList.unshift(user);
  
      this.setState({
        users: userList
      })
    }
  }

  /*
   * Toggles how many Profiles are rendered
   */
  toggleAllUsersList () {

    this.setState(state => ({
      allUsersVisible: !state.allUsersVisible
    }));

  }

  /*
   * Adds or removes AddUserModal
   * isVisible: whether AddUserModal is active
   */ 
  setAddUserModal (isVisible) {

    this.setState({
      addUserModalIsVisible: isVisible
    });

  }

  /*
   * Adds a song to the current user's slots.
   * song: song to be added
   */
  addSong (song) {

    if (this.state.songLimit > this.state.currentUser.songs.length) {

      const updatedSongs = this.state.currentUser.songs;
      updatedSongs.push(song)

      this.setState(state => ({
        currentUser: {
          ...state.currentUser,
          songs: updatedSongs
        }
      }));

      console.log(updatedSongs)

    } else {
      throw new Error(`You've already reached the limit of ${this.state.songLimit} songs. You'll need to receive a song slot donation from another user in order to add more songs.`)
    }
  }

  /*
   * Removes specified song from current user's song list.
   * Does nothing if the current user doesn't have that song.
   * removedSong: song to be removed
   */ 
  removeSong(removedSong) {

    const updatedSongs = this.state.currentUser.songs.filter(song => song !== removedSong);

    this.setState(state => ({
      currentUser: {
        ...state.currentUser,
        songs: updatedSongs
      }
    }))
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

      backToApp: () => this.setCurrentScreen('App'),

      addSong: this.addSong,

      removeSong: this.removeSong,

      checkForExistingSongOwner: this.checkForExistingSongOwner

    };

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

    this.setState({
      accessToken: new URLSearchParams(window.location.search).get('access_token') || null
    });

  }

  render(){

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
      slots: this.state.users ? this.state.songLimit * this.state.users.length : 0
    }

    const profilesToRender = () => {

      let renderResult = [];

      let userList = this.state.users.filter(user => user.name !== 'All');
      userList.unshift(allUsers);

      for (let i = 0; i < userList.length; i++) {

        if (i % 5 === 0) {

          let row = [];

          for (let j = i; j < i + 5 && j < userList.length; j++) {

            const user = userList[j];

            row.push(user);

          }   

          renderResult.push(row)
        }

      }

      return renderResult;
    }

    // User components to render
    const rowsToRender = this.state.allUsersVisible ? profilesToRender().length : 1

    return (

      this.state.accessToken ? (
        this.state.currentScreen === 'App' ? (
        <div className="App">

          <div className="section-divider"></div>
          
          <h1>Richard's Party Playlist</h1>
          <h2>Add Songs</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <TotalCounter 
              name="Users" 
              icon="user"
              value={totalUsers} 
            />
            <TotalCounter 
              name="Songs" 
              icon="music"
              value={totalSongs} 
            />
          </div>

          <div className="section-divider"></div>

          <section id="profiles">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <h3>Adding songs as: </h3>
              <FontAwesomeIcon
                style={{ cursor: 'pointer' }}
                onClick={ () => this.toggleAllUsersList() }
                icon={
                  this.state.allUsersVisible ? "angle-up" : "angle-down"
                }
              />
            </div>
            {
              this.state.currentUser && 
              profilesToRender().slice(0, rowsToRender).map((row, i) => 
                <ProfileRow 
                  key={`profile-row-${i}`}
                  profiles={row}
                  currentUser={this.state.currentUser}
                  setAsCurrentUser={this.setCurrentUser}
                />
              )
            }
            <button onClick={() => this.setAddUserModal(true)}>
                <FontAwesomeIcon icon={faPlus} /> Add new collaborator
              </button>
            {
              this.state.addUserModalIsVisible &&
              <AddNewUserModal
                users={this.state.users}
                addUser={this.addUser}
                close={() => this.setAddUserModal(false)}
              />
            }
          </section>

          <div className="section-divider"></div>

          <section id="your-songs">
            <h3>Your songs</h3>
            {
              this.state.currentUser ?
              <div>
                <strong>Current user: { this.state.currentUser.name }</strong>
                <h4>
                  { 
                    this.state.currentUser.songs.length }/{ 
                      this.state.currentUser.slots || this.state.songLimit 
                  } songs added
                </h4>
                <SongWrapper 
                  songs={this.state.currentUser.songs} 
                  slots={this.state.currentUser.slots}
                  openModal={() => this.setDonateSlotModal(true)}
                  moveToAddSongsScreen={() => this.setCurrentScreen('AddSongsScreen')}
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
          </section>

          
        </div> // End .App
      ) : (
        <AddSongsScreen
          accessToken={this.state.accessToken}
          addSongCallbacks={this.addSongCallbacks()}
        />
      )
      ) : (
        <div>
          <h1>Welcome to Spotify Party Mode</h1>
          <button 
          onClick={ () => {
            window.location = window.location.href.includes('localhost') 
            ? 'http://localhost:8888/login'
            : 'https://rxnaij-playlists-backend.herokuapp.com/login'
          }}
          style={{}}>
            Sign in with Spotify
        </button>
        </div>
        
      )

      /* Note: The screen routing that follows is going to suck. I apologize in advance,
       * but maintain that this is simply a prototype and not a production app.
       */
      
    )
  }
}
