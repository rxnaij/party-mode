import React, { useState, useEffect } from 'react';

import SearchResultsGroup from './components/search-results/SearchResultsGroup';
import SearchBox from './components/search-results/SearchBox'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/*
 * Interface for current user to search for a song and add it to one of their 
 * song slots
 * props:
 * currentUser: current user specified in parent component (App)
 * addSongCallBacks:
 *    backToApp(): return to App page
 *    addSong(): adds song to current user in parent
 *    checkForExistingSongOwner(): checks if a song is already owned by a user in parent
 */ 
export default function AddSongsScreen (props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [retrievedData, setRetrievedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prop methods from parent app
  //eslint-disable-next-line
  const { backToApp, addSong, checkForExistingSongOwner } = props.addSongCallbacks;
  const { accessToken } = props;
  
  // encodes search query to valid Spotify search query
  const writeQuery = (query, types) => {
    const endpoint = 'https://api.spotify.com/v1/search';
    const querySection = `q=${query.replace(/\s/, '+')}`;
    const typesSection = `type=${types.join()}`;

    const newQuery = endpoint + '?' + [querySection, typesSection].join('&');

    return newQuery;
  }

  useEffect(
    () => {

      let mounted = true;

      const fetchSearchData = async () => {

        setIsLoading(true)

        const fetchQuery = writeQuery(searchQuery, ['track', 'album', 'artist']);

        const response = await fetch(fetchQuery, {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        })
        const data = await response.json();

        // only changes state when SearchData components are mounted
        if (mounted) {
          setRetrievedData({
            data,
            type: 'search'
          });
        }

        console.log(data)

        setIsLoading(false)

      }

      if (accessToken && searchQuery) {
        fetchSearchData();
      } 
      // When query field is empty, SearchResultsGroup resets to default state
      else {
        setRetrievedData(null);
      }

      return () => {
        mounted = false;
      }
        
    },
    [accessToken, searchQuery]
  );

  /*
   * Returns an Array of Spotify track Objects. The track Objects are simplified for some reason
   * which means they DO NOT contain album information. What the fuck, Spotify? That's so annoying.
   * Just because of that ONE TINY thing, I spent the last 4 hours reworking my ENTIRE code for this
   * one goddamn component. God that's so dumb. Have a middle finger, Spotify. Your design sucks, too.
   * 
   * album_id: Spotify ID of the album
   */ 
  const getAlbumTracks = async (album_id) => {

    const response = await fetch(`https://api.spotify.com/v1/albums/${album_id}`, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const album = await response.json();

    const track_IDs = album.tracks.items.map(track => track.id);

    const trackRequests = await fetch(`https://api.spotify.com/v1/tracks/?ids=${track_IDs.join()}`, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
    const fullTrackObjects = await trackRequests.json();

    console.log('full track objects')
    console.log(fullTrackObjects)

    setRetrievedData({
      data: fullTrackObjects,
      type: 'album'
    });
    
  }

  const getArtistResults = async (artist_id) => {
    const getArtistTopTracks = async (artist_id) => {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/top-tracks?country=US`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      })
      const data = await response.json();
  
      return data;
    }
    const getArtistAlbums = async (artist_id) => {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      })
      const data = await response.json();
  
      return data;
    }

    const topTracks = await getArtistTopTracks(artist_id);
    const albums = await getArtistAlbums(artist_id);

    const results = {
      topTracks,
      albums
    }

    setRetrievedData({
      data: results,
      type: 'artist'
    })
  }

  

  return(
    <div className="AddSongsScreen">

      <div className="section-divider"></div>

      <nav style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div
          style={{
            display: 'inherit',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}
        >
          <FontAwesomeIcon 
            icon="times" 
            onClick={() => backToApp()}
          />
          <h1 style={{ // Change this to flex justify-around
            display: 'inline-block', 
            marginLeft: '1rem'
          }}>
            Add song
          </h1>
        </div>
        
        <SearchBox 
          handleSearchInputChange={ event => setSearchQuery(event.target.value)} 
          clearInput={() => setSearchQuery('')}
        />
        
      </nav>

      <div style={{ height: '2rem'}}></div>

      <div>
        {
          isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h3>
                {retrievedData && retrievedData.type}
              </h3>
              <SearchResultsGroup
                retrievedData={retrievedData && retrievedData.data}
                retrievedDataType={retrievedData && retrievedData.type}
                getAlbumTracks={getAlbumTracks}
                getArtistResults={getArtistResults}
                addSongCallbacks={props.addSongCallbacks}
              />
            </div>
            
          ) // exit isLoading?:
        }
      </div>
    </div>
  );
};

// eslint-disable-next-line
const fakeData = {
  searchResults: [
    {
      type: 'track',
      name: 'Lonely Boy',
      artist: 'The Black Keys',
      imageURL: '',
    },
    {
      type: 'track',
      name: 'Lonely Boy',
      artist: 'Andrew Gold',
      imageURL: '',
    },
    {
      type: 'track',
      name: 'Lonely Boy',
      artist: 'John Chen',
      imageURL: '',
    },
    {
      type: 'artist',
      name: 'The Lonely Guys',
      artist: null,
      imageURL: '',
    },
    {
      type: 'artist',
      name: 'Lonely Boy',
      artist: null,
      imageURL: '',
    },
    {
      type: 'album',
      name: 'Los Lonely Boys',
      artist: 'Los Lonely Boys',
      imageURL: ''
    },
    {
      type: 'album',
      name: 'The Lonely Boys',
      artist: 'Andrew Gold',
      imageURL: ''
    }
  ]
}