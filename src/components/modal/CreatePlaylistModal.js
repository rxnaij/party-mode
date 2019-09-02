import React from 'react';
import ModalShade from './ModalShade';

export default function CreatePlaylistModal (props) {

  const { accessToken, playlistName, description, users, close } = props;

  // Fetches current user's ID from spotify
  async function getCurrentUserID (accessToken) {

    const response = await fetch('https://api.spotify.com/v1/me', { 
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const data = await response.json();
    const user_id = data.id;

    console.log('user id', user_id)

    return user_id;
  }

  // creates new playlist on Spotify
  // returns ID of that playlist
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

    console.log('playist id', playlist_id);

    return playlist_id;
  }

  function assemblePlaylist (users) {
    const playlist = users.reduce((tracks, user) => tracks.concat(user.songs), []);

    console.log('assembled playlist', playlist)

    return playlist;
  }

  function getPlaylistURIs (playlist) {
    const uriList = playlist.reduce((uris, track) => uris.concat(track.uri), []);
    const uriListData = JSON.stringify({"uris": uriList});

    console.log('playlist URIs', uriListData);

    return uriListData;
  }

  async function addSongsToPlaylist (playlist_id, users) {

    const playlist = assemblePlaylist(users);

    const tracks = getPlaylistURIs(playlist);

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      headers: {
        'Authorization': 'Bearer ' +  accessToken,
        'Content-Type': 'application/json'
      },
      body: tracks,
      method: 'POST'
    });

    const status = await response.json();
    console.log(status);
  }

  return(
    <ModalShade
      close={close}
    >
      <h1>You're about to create the playlist!</h1>
      <h2>New Playlist Name</h2>
      <button
        className="primary"
        onClick={ async () => {
          // Create playlist
          const id = await createPlaylist(accessToken, playlistName, description);
          // Add songs to playlist
          addSongsToPlaylist(id, users);
        }}
      >
        Create playlist
      </button>
    </ModalShade>
  );
}