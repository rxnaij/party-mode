// eslint-disable-next-line
import React, { Component, useState, useEffect } from 'react';
import 'reset-css';
import './App.css';

// Components
//    Screens
import AddSongsScreen from './AddSongsScreen';
import InitializeScreen from './InitializeScreen';
//    Individual components
import ProfileRow from './components/profiles/ProfileRow';
import AddNewUserModal from './components/modal/AddNewUserModal';
import DonateSlotModal from './components/modal/DonateSlotModal';
import CreatePlaylistModal from './components/modal/CreatePlaylistModal';
import TotalCounter from './components/counter/TotalCounter';
import SongWrapper from './components/song-slots/SongWrapper';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faPlus, faHands, faTimes, faSearch, faAngleUp, faAngleDown, faPlayCircle, faUser, faMusic, faChevronRight } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faPlus, faHands, faTimes, faSearch, faAngleUp, faAngleDown, faPlayCircle, faUser, faMusic, faChevronRight);



// App component
export default class App extends Component {
  constructor() {
    super();
    this.state = {

      authorizedUserName: '',

      playlistName: 'My New Party Playlist',

      initialSlots: 0,

      equalizedShuffle: false,

      users: [],

      /* Login check (temporary placeholder) */
      accessToken: null,
      userID: null,

      /* Screen visibility triggers */

      screens: ['App', 'AddSongsScreen', 'InitializeScreen'],
      currentScreen: 'InitializeScreen',

      /* Component visibility triggers */

      allUsersVisible: false,
      addUserModalIsVisible: false,
      donateSlotModalIsVisible: false,
      createPlaylistModalIsVisible: false,
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
    this.setCreatePlaylistModal = this.setCreatePlaylistModal.bind(this);
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

  setCreatePlaylistModal (isVisible) {

    this.setState({
      createPlaylistModalIsVisible: isVisible
    })

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

    const updatedDonor = this.state.users.find(user => user.id === donor.id);
    updatedDonor.slots--;

    const updatedRecipient = this.state.users.find(user => user.id === recipient.id);
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

  async componentDidMount() {

    const accessToken = new URLSearchParams(window.location.search).get('access_token') || null;

    this.setState({
      accessToken
    });

    // gets name of current user
    if (accessToken) {
      const name = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }).then(response => response.json())
      .then(data => data.display_name || data.id);

      this.setState({
        authorizedUserName: name
      });

      console.log(this.state.authorizedUserName)
    }

  }

  componentDidUpdate() {
    if (!this.state.currentUser) {
      this.state.users.length > 0 && this.setCurrentUser(this.state.users[0]);
    }
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
                  initialSlots={this.state.initialSlots}
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
                <div>Add a collaborator to get started.</div>
              }
            </section>

            <button className="primary" style={{
              position: 'fixed',
              right: '1rem',
              bottom: '1rem',

              border: 0,

              boxShadow: '0 8px 16px hsla(0, 0%, 0%, 0.3)',

            }} onClick={ () => this.setCreatePlaylistModal(true)}
            >
              Create playlist!
            </button>

            {this.state.createPlaylistModalIsVisible &&
            <CreatePlaylistModal
              accessToken={this.state.accessToken}
              initialSlots={this.state.initial}
              playlistName={this.state.playlistName}
              description="This is a new party playlist!"
              users={this.state.users}
              close={() => this.setCreatePlaylistModal(false)}
            />
            }
            
          </div> // End .App
        ) : ( // Add songs screen: currentScreen === 'AddSongsScreen'
          this.state.currentScreen === 'AddSongsScreen' ? (
            <AddSongsScreen
              accessToken={this.state.accessToken}
              addSongCallbacks={this.addSongCallbacks()}
            />
          ) : ( // Initialze screen: currentScreen === 'InitializeScreen'
            <InitializeScreen 
              authorizedUserName={this.state.authorizedUserName}
              initializeCallbacks={this.initializeCallbacks()}
            />
          )
        )
      ) : ( // Login screen
        <div className="LoginScreen">
          <div className="section-divider"></div>
          <h1 className="fade-in">Welcome to Party Mode!</h1>
          <h2 className="animation-delay" style={{textAlign: 'center'}}>Create and organize collaborative playlists for your party, road trip, etc.</h2>
          <div className="section-divider"></div>
          <h3>Signing in to Spotify will grant Party Mode access to the following:</h3>
          <ul className="bullet-list">
            <li>Ability to create public and/or private playlists in your Spotify account</li>
          </ul>
          <div className="section-divider"></div>
          <button 
            className="primary animation-delay"
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
