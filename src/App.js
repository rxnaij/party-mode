import React, { Component } from 'react';
// import 'reset-css';
import './App.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faPlus)

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: fakeData,
      allUsersVisible: false,
      addUserModalIsVisible: false
    }
    this.showAddUserModal = this.showAddUserModal.bind(this);
    this.hideAddUserModal = this.hideAddUserModal.bind(this);
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
      currentUser: state.data.users.find( (user) => user.name === 'Michael'),
      songLimit: 5
    }));
  }

  render(){
    // Data check (for debugging)
    this.state.currentUser && console.log(this.state.currentUser);
    // Total stats of all users
    const totalUsers = this.state.data.users.length;
    const totalSongs = this.state.data.users.reduce(
      (sumSongs, user) => sumSongs += user.songs.length
      , 0);
    // Components to render
    const usersToRender = this.state.allUsersVisible
      ? totalUsers
      : 4;
    const songSlotsToRender = 
      this.state.currentUser &&
      this.state.currentUser.songs.map((song, i) =>
        <div className="filled" key={i}>
          <input type="checkbox" name="" id=""/>
          <h5>{song.title}</h5>
          <h6>{song.artist}</h6>
          <button>Preview</button>
        </div>
      );
    if (this.state.currentUser) {
      for (let i = 0; i < this.state.songLimit - this.state.currentUser.songs.length; i++) {
        songSlotsToRender.push(
          <div className="empty">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add song or give slot to friend</span>
          </div>
        );
      }
    }
    return (
      <div className="App">
        <h1>Richard's Party Playlist</h1>
        <h2>Add Songs</h2>
        <div>
          Total Users: { totalUsers }
        </div>
        <div>
          Total Songs: { totalSongs }
        </div>

        <div id="SongWrapperComponent">
          <h3>Adding songs as: </h3>
          <button onClick={ () =>
            this.setState({
              allUsersVisible: !this.state.allUsersVisible
            })
          }>Show all</button>
          <div onClick={() => {
            // Array of all users' songs
            const allSongs = this.state.data.users.reduce((list, user) =>
              list.concat(user.songs)
            , []);
            console.log(allSongs); // Data check
            this.setState({
              currentUser: {
                name: 'All',
                songs: allSongs
              }
            });
          }
          }>
            All: { totalSongs }
          </div>
          {
            this.state.data.users.slice(0, usersToRender).map(user =>
              <div onClick={() => 
                  this.setState({
                    currentUser: user
                  })
                }
                key={user.id}>
                {user.name}: {user.songs.length}
              </div>
            )
          }
          <button onClick={() => this.showAddUserModal()}><FontAwesomeIcon icon={faPlus} /> Add new collaborator</button>
          {
            this.state.addUserModalIsVisible &&
            <div style={{
              zIndex: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'hsla(0,0%,0%,50%)'
            }}>
              <div style={{
                zIndex: 2,
                display: 'inline-block',
                margin: '0 auto',
                padding: '2rem',
                backgroundColor: 'white'
              }}>
                <label to="newUserName">Add new collaborator:</label>
                <input type="text" name="newUserName" id="newUserName"/>
                <button style={{
                  backgroundColor: 'red'
                }} onClick={() => this.hideAddUserModal()}>
                  Cancel
                </button>
                <button style={{
                  backgroundColor: 'green'
                }} onClick={() => {
                  if (document.getElementById('newUserName').value) {
                    const currentData = this.state.data;
                    currentData.users.push({
                      name: document.getElementById('newUserName').value,
                      id: Math.floor(Math.random() * 1000),
                      songs: []
                    });
                    this.setState({
                      data: currentData
                    });
                    console.log(currentData)
                  }
                  this.hideAddUserModal()
                }}>
                  Add
                </button>
              </div>
            </div>
            
          }
        </div>

        <h3>Your songs</h3>
        {
          this.state.currentUser &&
          <div>
            <strong>Current user: { this.state.currentUser.name }</strong>
            <h4>{ this.state.currentUser.songs.length }/{this.state.songLimit} songs added</h4>
            { songSlotsToRender }
          </div>
        }

      </div> // End .App
    );
  }
}

export default App;
