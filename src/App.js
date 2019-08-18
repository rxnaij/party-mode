import React, { Component } from 'react';
// import 'reset-css';
import './App.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faPlus, faHands } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faPlus, faHands)

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
  const style = {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'hsla(0,0%,0%,50%)'
  }

  return(
    <div style={ style }>
      { props.children }
    </div>
  )
}

/* ADD NEW USER BUTTON */
const AddNewUserButton = props => {
  const style={
    zIndex: 2,
    display: 'inline-block',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white'
  }
  
  return(
    <ModalShade>
      <div style={ style }>
        <form>
          <label to="newUserName">Add new collaborator:</label>
          <input type="text" name="newUserName" id="newUserName"/>
          <button onClick={ () => this.props.close() }>
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
      </div>
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
const EmptySongSlot = () => {
  return(
    <div style={ songSlotStyle }>
      <button style={{ ...inlineBlockStyle }}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Add song</span>
      </button>
      <button 
        style={{ ...inlineBlockStyle }}
      >
        <FontAwesomeIcon icon={faHands} />
        <span>Donate slot to friend</span>
      </button>
    </div>
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
  for (let i = 0; i < props.songLimit - props.songs.length; i++) {
    slotsToRender.push(<EmptySongSlot />);
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
      users: fakeData.users,
      allUsersVisible: false,
      addUserModalIsVisible: false
    }
    // Binding state helper functions
    this.addUser = this.addUser.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.showAddUserModal = this.showAddUserModal.bind(this);
    this.hideAddUserModal = this.hideAddUserModal.bind(this);
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

  componentDidMount() {
    // Fake initial data-loading for now
    // Adds new states
    this.setState((state, props) => ({
      currentUser: state.users.find( (user) => user.name === 'Michael'),
      songLimit: 5
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
          this.state.currentUser &&
          <div>
            <strong>Current user: { this.state.currentUser.name }</strong>
            <h4>{ this.state.currentUser.songs.length }/{ this.state.songLimit } songs added</h4>
            <SongWrapper songs={ this.state.currentUser.songs } songLimit={ this.state.songLimit } />
          </div>
        }

      </div> // End .App
    );
  }
}

export default App;
