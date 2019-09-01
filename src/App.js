// eslint-disable-next-line
import React, { Component, useState, useEffect } from 'react';
import 'reset-css';
import './App.css';

// Components
//    Screens
import AddSongsScreen from './AddSongsScreen';
import InitializeScreen from './InitializeScreen';
//    Individual components
import ProfileRow from './components/profiles/ProfileRow'
import AddNewUserModal from './components/modal/AddNewUserModal'
import DonateSlotModal from './components/modal/DonateSlotModal';
import TotalCounter from './components/counter/TotalCounter';
import SongWrapper from './components/song-slots/SongWrapper';

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

// App component
export default class App extends Component {
  constructor() {
    super();
    const initialSlots = 5;
    this.state = {

      playlistName: null,

      initialSlots,

      equalizedShuffle: false,

      users: [
        // ...fakeData.users.map(user => ({
        //   ...user,
        //   slots: initialSlots
        // }))
      ],

      /* Login check (temporary placeholder) */
      accessToken: null,

      /* Screen visibility triggers */

      screens: ['App', 'AddSongsScreen', 'InitializeScreen'],
      currentScreen: 'InitializeScreen',

      /* Component visibility triggers */

      allUsersVisible: false,
      addUserModalIsVisible: false,
      donateSlotModalIsVisible: false,
    }

    // Binding state helper methods
    // State setters
    this.setCurrentScreen = this.setCurrentScreen.bind(this);
    this.setPlaylistName = this.setPlaylistName.bind(this);
    this.setInitialSlots = this.setInitialSlots.bind(this);
    this.setEqualizedShuffle = this.setEqualizedShuffle.bind(this);

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

  setPlaylistName (name) {
    this.setState({
      playlistName: name
    })
  }

  setInitialSlots (num) {
    this.setState({
      initialSlots: num
    })
  }

  setUsers () {

  }

  setEqualizedShuffle (val) {
    this.setState({
      equalizedShuffle: val
    })
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

    if (this.state.users.length === 0) {
      this.setCurrentUser(newUser);
    }

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

    if (this.state.initialSlots > this.state.currentUser.songs.length) {

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
      throw new Error(`You've already reached the limit of ${this.state.initalSlots} songs. You'll need to receive a song slot donation from another user in order to add more songs.`)
    }
  }

  /*
   * Removes specified song from current user's song list.
   * Does nothing if the current user doesn't have that song.
   * removedSong: song to be removed
   */ 
  removeSong (removedSong) {

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
  setDonateSlotModal (isVisible) {

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
  donateSongSlot (donor, recipient) {

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

  organizePlaylist (users) {
    // Basic alg that will iterate through each user's lists once, in order
    // Assume that all users have added the max # of songs allowed
    let organized = [];

    let userList = users.reduce((songList, user) => songList.concat([ user.songs ]), [])

    for (let j = 0; j < 2; j++) {

      for (let i = 0; i < userList.length; i++) {
        if (userList[i][j]) {
          organized.push(userList[i][j])
        }
      }
    }
    
    return organized;

  }

  // The order of users and order of songs is randomly selected.
  // However, the list is guaranteed to be organized in a way
  // that alternates across users, such that each user is guaranteed
  // to go at least once every cycle.
  organizePlaylist_randomSelection (users) {
    // Randomly shuffles elements in array, based off Fisher-Yates algorithm
    function shuffle(array) {
      let m = array.length;
      let t, i;

      // While there remains elements to shuffle...
      while (m) {

        // Pick a remaining element randomly...
        i = Math.floor(Math.random() * m--);
          // i = random element in array
          // m = number of unshuffled elements left in array

        // And swap it with the current element.
        t = array[m]; // t = element at end of unshuffled elements in front of array
          // swaps last unshuffled element with random element
        array[m] = array[i]; 
        array[i] = t;
      }

      return array;
    }


    let organized = [];

    let maxSlots = this.state.initialSlots; // Maximum number of songs in list

    // Gets each users' songs as arrays...
    let shuffledSongs = users.reduce((songList, user) => {

      // Identifies the max amount of slots, just in case a user has slots
      // greater than the initial number of slots set
      if (user.songs.length > maxSlots) {
        maxSlots = user.songs.length;
      }

      // Shuffles current user's set of songs
      let shuffled = shuffle(user.songs);

      // Adds array of user's songs to array
      return songList.concat([ shuffled ]);
      
    }, [])

    // Get all of the indexes of the users in the playlist
    // and shuffle the order of their indexes
    let shuffledUsers = shuffledSongs.map((user, i) => i);
    shuffledUsers = shuffle(shuffledUsers);

    // Loops through each songSlot in order...
    for (let i = 0; i < maxSlots; i++) {

      // And, with each songSlot, loops through each user
      for (let j = 0; j < shuffledUsers.length; j++) {

        if (shuffledSongs[shuffledUsers[j]][i]) { // need to keep direct reference here in case of undefined
          organized.push(shuffledSongs[shuffledUsers[j]][i]);
        }

      }

    }

    return organized;
  }

  

  // Grouping callbacks

  // Add songs screen
  addSongCallbacks () {

    return {

      backToApp: () => this.setCurrentScreen('App'),

      addSong: this.addSong,

      removeSong: this.removeSong,

      checkForExistingSongOwner: this.checkForExistingSongOwner

    };

  }

  // Initialize screen
  initializeCallbacks () {

    return {

      backToApp: () => this.setCurrentScreen('App'),

      setPlaylistName: this.setPlaylistName,

      setInitialSlots: this.setInitialSlots,

      setEqualizedShuffle: this.setEqualizedShuffle,

      addUser: this.addUser,

    };
  }

  /* Lifecycle methods */

  componentDidMount() {

    console.log('logging app component mount')
    console.log(this.state.users)

    // Fake initial data-loading for now
    this.state.users.length > 0 && this.setCurrentUser(this.state.users[0]);

    this.setState(state => ({
      accessToken: new URLSearchParams(window.location.search).get('access_token') || null,
    }) );

  }

  componentDidUpdate() {
    if (!this.state.currentUser) {
      this.state.users.length > 0 && this.setCurrentUser(this.state.users[0]);
    }
  }

  render(){

    console.log(
      'organizePlaylist_randomSelection', this.organizePlaylist_randomSelection(this.state.users)
    )

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
      slots: this.state.users ? this.state.initialSlots * this.state.users.length : 0
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

        this.state.currentScreen === 'App' && this.state.playlistName !== null ? (

          <div className="App">

            <div className="section-divider"></div>
            
            <h1>{ this.state.playlistName || 'Party Playlist' }</h1>
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
              <button 
                className="secondary"
                style={{display: 'block', margin: '0 auto'}}
                onClick={() => this.setAddUserModal(true)}
              >
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
                        this.state.currentUser.slots || this.state.initialSlots 
                    } songs added
                  </h4>
                  <SongWrapper 
                    songs={this.state.currentUser.songs} 
                    numSlots={this.state.currentUser.slots}
                    initialSlots={this.state.intialSlots}
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
        ) : ( // Add songs screen: currentScreen === 'AddSongsScreen'
          this.state.currentScreen === 'AddSongsScreen' ? (
            <AddSongsScreen
              accessToken={this.state.accessToken}
              addSongCallbacks={this.addSongCallbacks()}
            />
          ) : ( // Initialze screen: currentScreen === 'InitializeScreen'
            <InitializeScreen 
              initializeCallbacks={this.initializeCallbacks()}
            />
          )
        )
      ) : ( // Login screen
        <div>
          <h1>Welcome to Spotify Party Mode!</h1>
          <button 
            className="primary"
            onClick={ () => {
              window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login'
              : 'https://rxnaij-playlists-backend.herokuapp.com/login'
            }}
            style={{
              display: 'block',
              margin: '0 auto'
            }}>
              Sign in with Spotify
          </button>
        </div>
        
      )

      /* Note: The screen routing sucks, I know. I apologize in advance,
       * but maintain that this is simply a prototype and not a production app.
       */
      
    )
  }
}
