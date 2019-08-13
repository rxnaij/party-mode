import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1>Richard's Party Playlist</h1>
        <h2>Add Songs</h2>
        <div>
          Total Users: 4
        </div>
        <div>
          Total Songs: 12
        </div>
        <h3>Adding songs as: </h3>
        <div>
          All: 10
        </div>
        <div>
          Richard: 1
        </div>
        <div>
          Steven: 3
        </div>
        <div>
          Quin: 2
        </div>
        <div>
          Michael: 4
        </div>
        <h3>Your songs</h3>
        <h4>1/5 songs added</h4>
        <div className="filled">
          <input type="checkbox" name="" id=""/>
          <h5>Sad Valentine</h5>
          <h6>No Vacation</h6>
          <button>Preview</button>
        </div>
        <div className="empty">
          Add song or give slot to friend
        </div>
        <div className="empty">
          Add song or give slot to friend
        </div>
        <div className="empty">
          Add song or give slot to friend
        </div>
        <div className="empty">
          Add song or give slot to friend
        </div>
      </div> // End .App
    );
  }
}

export default App;
