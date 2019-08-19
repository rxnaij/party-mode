import React, { Component, useState, useEffect } from 'react';
// import 'reset-css';
import './App.css';

import AddSongs from './AddSongs';

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
          title: 'Let it Go',
          artist: 'Frozen'
        }
      ]
    },
    {
      name: 'Steven',
      id: 1,
      songs: [
        {
          title: 'Satellite Mind',
          artist: 'Metric'
        },
        {
          title: 'Lonely Boy',
          artist: 'The Black Keys'
        }
      ]
    },
    {
      name: 'Julia',
      id: 2,
      songs: [
        {
          title: "Can't Stop Us",
          artist: 'Macklemore'
        }
      ]
    },
    {
      name: 'Quin',
      id: 3,
      songs: [
        {
          title: 'i',
          artist: 'Kendrick Lamar'
        },
        {
          title: 'Time',
          artist: 'Pink Floyd'
        }
      ]
    },
    {
      name: 'Christina',
      id: 4,
      songs: [
        {
          title: 'Take A Chance On Me',
          artist: 'ABBA'
        }
      ]
    },
    {
      name: 'Richard',
      id: 5,
      songs: [
        {
          title: 'Sad Valentine',
          artist: 'No Vacation'
        }
      ]
    },
    {
      name: 'Rosie',
      id: 6,
      songs: [
        {
          title: 'Seoul Town Road',
          artist: 'BTS'
        }
      ]
    },
    {
      name: 'Keeling',
      id: 7,
      songs: [
        {
          title: 'Kids',
          artist: 'MGMT'
        }
      ]
    },
    {
      name: 'Michael',
      id: 8,
      songs: [
        {
          title: 'La vie en rose',
          artist: 'Louie Armstrong'
        },
        {
          title: 'Sin Triangle',
          artist: 'Sidney Gish'
        }
      ]
    },
    {
      name: 'Sophia',
      id: 9,
      songs: [
        {
          title: "Friday I'm In Love",
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

// TotalCounter component
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

const Profile = props => {
  return(
    <div
      onClick={ () => props.setCurrentUser(props.user) }
      key={props.user.id}
    >
      {props.user.name}: {props.user.songs.length}
    </div>
  )
};

const ModalShade = props => {
  const backgroundStyle = {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'hsla(0,0%,0%,50%)'
  }

  const modalStyle={
    zIndex: 2,
    display: 'inline-block',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white'
  }

  return(
    <div 
      style={ backgroundStyle }
      onClick={ () => props.close() }
    >
      <div style={ modalStyle }>
        { props.children }
      </div>
    </div>
  )
}

/* ADD NEW USER BUTTON */
const AddNewUserButton = props => {

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
}

/* SONG SLOTS */

const songSlotStyle = {
  border: '1px solid black',
  borderRadius: '8px',
  maxWidth: '70%',
  margin: '0 auto'
};

// Slot that contains a song belonging to the current user in the app
const FilledSongSlot = props => {
  return(
    <div style={ songSlotStyle }>
      <input type="checkbox" name="" id="" style={ inlineBlockStyle } />
      <div style={ inlineBlockStyle }>
        <h5>{props.song.title}</h5>
        <h6>{props.song.artist}</h6>
      </div>
      <button>Preview</button>
    </div>
  )
}

// TODO: add logic for slot donation
const EmptySongSlot = props => {

  return(
    <div style={ songSlotStyle }>
      <button style={ inlineBlockStyle }>
        <FontAwesomeIcon icon={faPlus} />
        <span>Add song</span>
      </button>
      <button 
        style={ inlineBlockStyle }
        onClick={ () => props.setDonateUserModal(true) }
      >
        <FontAwesomeIcon icon={faHands} />
        <span>Donate slot to friend</span>
      </button>
    </div>
  )
}

const DonateModal = props => {
  return(
    <ModalShade close={props.close} >
      <button onClick={() => props.close()}>
        Close
      </button>
      <h3>Select the user you would like to give a slot to.</h3>
      <ul>
      {
        props.users.map(user => 
          <li 
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
        )
      }
      </ul>
    </ModalShade>
  )
}

// **Potential new logic:
// Create an array with $songLimit number of EmptySongSlots
// find() EmptySongSlots
// Remove (or replace?)
const SongWrapper = props => {
  /* Fills an array with FilledSongSlots for each song
     that a user has already added.
     Then EmptySongSlots are added to the array until 
     the array's length becomes equal to songLimit. 
  */
  const slotsToRender = props.songs.map(song =>
    <FilledSongSlot song={song} />
  );
  for (let i = 0; i < props.slots - props.songs.length; i++) {
    slotsToRender.push(
      <EmptySongSlot
        users={props.users}
        donateSongSlot={props.donateSongSlot}
        setDonateUserModal={props.setDonateUserModal}
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
      // Modal/popup triggers
      allUsersVisible: false,
      addUserModalIsVisible: false,
      donateSlotModalIsVisible: false,
    }
    // Binding state helper functions
    this.addUser = this.addUser.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.showAddUserModal = this.showAddUserModal.bind(this);
    this.hideAddUserModal = this.hideAddUserModal.bind(this);
    this.setDonateUserModal = this.setDonateUserModal.bind(this);
    this.donateSongSlot = this.donateSongSlot.bind(this);
  }

  addUser(newUser){
    const updatedUsers = this.state.users;
    updatedUsers.push(newUser);
    this.setState({
      users: updatedUsers
    })
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: user
    })
  }

  toggleAllUsersList() {
    const toggle = !this.state.allUsersVisible
    this.setState({
      allUsersVisible: toggle
    })
  }

  showAddUserModal() {
    this.setState({
      addUserModalIsVisible: true
    });
  }

  hideAddUserModal() {
    this.setState({
      addUserModalIsVisible: false
    });
  }

  setDonateUserModal(isVisible) {
    this.setState({
      donateSlotModalIsVisible: isVisible
    });
  }

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
      songs: this.state.users.reduce( (list, user) => list.concat(user.songs), []) // Translation: "Turn data.users into a list, and for each user, append their collection of songs to the list."
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
            setCurrentUser={this.setCurrentUser}
          />
          {
            this.state.users.slice(0, usersToRender).map(user =>
              <Profile user={user} setCurrentUser={this.setCurrentUser} />
            )
          }
          {/* User Profile Components */}
          <button onClick={() => this.showAddUserModal()}><FontAwesomeIcon icon={faPlus} /> Add new collaborator</button>
          {
            this.state.addUserModalIsVisible &&
            <AddNewUserButton
             users={this.state.users}
             addUser={this.addUser}
             close={this.hideAddUserModal}
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
              songs={ this.state.currentUser.songs } 
              slots={ this.state.currentUser.slots }
              setDonateUserModal= { this.setDonateUserModal }
              users={ this.state.users }
              currentUser = { this.state.currentUser }
            />
            {
              this.state.donateSlotModalIsVisible &&
              <DonateModal 
                users={this.state.users}
                currentUser={this.state.currentUser}
                donateSongSlot={this.donateSongSlot}
                close={() => this.setDonateUserModal(false)}
              />
            }
          </div> :
          <div>Loading...</div>
        }

        <hr/>
        <AddSongs />

      </div> // End .App
    );
  }
}

export default App;
