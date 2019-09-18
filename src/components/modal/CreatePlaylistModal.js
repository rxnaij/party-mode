import React, { useState } from 'react';
import ModalShade from './ModalShade';
import equalizeShuffle from '../playlist/sorting/equalizeShuffle'

/*
 * A modal that permits the user to create a Spotify playlist from the tracks
 * provided in the app.
 * 
 * props:
 * accessToken: Spotify access token for making API requests
 * playlistName: name of playlist
 * description: description of playlist
 * users: users to add
 * close(): exits modal in parent app
 */
export default function CreatePlaylistModal (props) {

  const { accessToken, playlistName, description, users, close } = props;

  const [equalizedShuffleInput, setEqualizedShuffleInput] = useState(false);
  const [successFeedbackLabel, setSuccessFeedbackLabel] = useState(false);

  /*
   * Returns the user ID of the user currently logged in to Spotify.
   *
   * accessToken: access token required to make calls to Spotify API
   *
   */ 
  async function getCurrentUserID (accessToken) {

    const response = await fetch('https://api.spotify.com/v1/me', { 
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const data = await response.json();
    const user_id = data.id;

    console.log(`%cUser ID: ${user_id}`, 'color: red')

    return user_id;
  }

  /*
   *  Creates a new playlist on the current user's Spotify account from the
   *  songs and playlist data provided in the app.
   *  Returns the ID of the newly created playlist.
   *
   *  accessToken: access token required to make calls to Spotify API
   *  name: name of playlist
   *  description: description of playlist
   *  isPublic: whether the playlist can be viewed by anyone
   *  isCollaborative: whether other users can add songs to the playlist
   *
   */
  async function createPlaylist (accessToken, name, description = '', isPublic = false, isCollaborative = false) {

    const user_id = await getCurrentUserID(accessToken);

    const postData = JSON.stringify({
      "name": name,
      "description": description,
      "public": isPublic,
      "collaborative": isCollaborative
    });
  
    // Side effect: create new playlist in Spotify account
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: postData,
      method: 'POST'
    });
    const data = await response.json();
    const playlist_id = data.id;

    console.log(`%Create Playlist response:`, 'color: green');
    console.log(response)
    console.log(`%Create Playlist data:`, 'color: orange');
    console.log(data)
    console.log(`%cPlaylist ID: ${playlist_id}`, 'color: blue');

    return playlist_id;
  }

  /*
   *  Returns a pure array of Spotify tracks from an array of user objects.
   *
   *  users: an array of user Objects with songs[] arrays
   *  equalizeShuffle: whether the playlist is equalized-shuffled
   * 
   */ 
  function assemblePlaylist (users, shouldEqualizeShuffle = false) {

    let playlist = users.reduce((tracksByUser, user) => tracksByUser.concat([user.songs]), []);

    if (shouldEqualizeShuffle) {
      playlist = equalizeShuffle(playlist);
    } else {
      playlist = playlist.flat();
    }

    return playlist;
  }

  /*
   *  Returns a JSON object with the key "uris" and the value an array 
   *  of Spotify track URIs from an array of the corresponding track IDs.
   *
   *  playlist: an array of Spotify track objects
   *
   */ 
  function getURIsFromTracks (playlist) {
    const uriList = playlist.reduce((uris, track) => uris.concat(track.uri), []);
    const uriListData = JSON.stringify({"uris": uriList});

    return uriListData;
  }

  /*
   *  Adds tracks to the specified Spotify playlist.
   *
   *  Precondition:
   *  In this app, this function is assumed to always follow the value of createPlaylist()
   *  so that it may only add to the playlist just created by the current user.
   *
   *  playlist_id: ID of playlist to add songs to
   *  users: data of user objects containing songs[] arrays of Spotify tracks
   * 
   */ 
  async function addSongsToPlaylist (playlist_id, track_URIs) {

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      headers: {
        'Authorization': 'Bearer ' +  accessToken,
        'Content-Type': 'application/json'
      },
      body: track_URIs,
      method: 'POST'
    });

    // trigger confirmation feedback
    console.log('Response:')
    console.log(response)

    const status = response.status;
    console.log('Status: ', status);
    setSuccessFeedbackLabel(true);
  }


  /* 
   *  Component render
   */
  return(

    <ModalShade
      close={close}
    >
      <h1>You're about to create a new Party Playlist:</h1>
      <h2>{playlistName}</h2>
      <fieldset className="form">
        <div className="form-section checkbox-input">
          <div className="checkbox-selection">
          <label>Equalize shuffle</label>
          <input
            type="checkbox"
            name="equalize-shuffle"
            value={equalizedShuffleInput}
            onChange={() => setEqualizedShuffleInput(!equalizedShuffleInput)}
          />
          </div>
          <p className="helper-text">Equalized Shuffle organizes the playlist's songs such that everyone's songs are guaranteed to play in a randomly selected order.</p>
        </div>
      </fieldset>
      <button
        className="primary"
        onClick={ async () => {

          // Create playlist in Spotify
          const playlist_id = await createPlaylist(accessToken, playlistName, description);

          // Gather all track URIs
          const tracks = assemblePlaylist(users, equalizedShuffleInput);
          const track_URIs = getURIsFromTracks(tracks);

          // Add songs to playlist
          addSongsToPlaylist(playlist_id, track_URIs, users);
        }}
      >
        Create playlist
      </button>
      {
        successFeedbackLabel && 
        <ModalShade
          close={() => setSuccessFeedbackLabel(false)}
        >
          <h2>{ playlistName } has been created!<br />Time to jam!</h2>
          <p style={{ marginBottom: '2rem' }}>You can find this new party playlist under the Playlists tab in your Spotify app.</p>
          <button
            className="primary full-width" 
            onClick={() => {
              setSuccessFeedbackLabel(false);
              close();
            }}>
              OK
            </button>
        </ModalShade>
      }
    </ModalShade>

  );
}