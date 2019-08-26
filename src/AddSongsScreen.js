import React, { useState, useEffect } from 'react';

import SpotifyWebApi from 'spotify-web-api-js';
import SearchResultsGroup from './components/search-results/SearchResults'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBox = props => {

  const { handleSearchInputChange, clearInput } = props;

  const searchInputStyle = {
    position: 'relative',
    display: 'inline-block',

    width: '100%',
    height: '2rem',
    padding: '1rem',

    borderRadius: '4px',
    border: 'none',

    boxShadow: '0px 8px 16px hsla(0,0%,0%,0.3)',

    color: 'hsla(0,0%,0%,0.8',
    fontSize: '1.25rem',
    fontWeight: '200'
  }

  const inputClearStyle = {
    zIndex: 1,
    position: 'absolute',
    right: '0.25rem',
    top: '0.25rem',

    color: '#000000'
  }

  return(
    <div>
      <div>
        <FontAwesomeIcon icon="search" />
        <label htmlFor="songSearch">Search for a song: </label>
      </div>
      <div style={{
        position: 'relative'
      }}>
        <input
          type="search"
          name="songSearch"
          id="songSearch"
          style={searchInputStyle}
          onChange={handleSearchInputChange}
        />
        <FontAwesomeIcon
          icon="times" 
          style={inputClearStyle}
          onClick={ () => clearInput()}
        />
      </div>
    </div>
      
  )
}

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
  const [searchData, setSearchData] = useState(null);
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
          setSearchData(data);
        }

        console.log(data)

        setIsLoading(false)

      }

      if (accessToken && searchQuery) {
        fetchSearchData();
      } 
      // When query field is empty, SearchResultsGroup resets to default state
      else {
        setSearchData(null)
      }

      return () => {
        mounted = false;
      }
        
    },
    [accessToken, searchQuery]
  );

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

      <div className="section-divider"></div>

      <div>
        {
          isLoading ? (
            <div>Loading...</div>
          ) : (
            <SearchResultsGroup
              searchResults={searchData}
              addSongCallbacks={props.addSongCallbacks}
            />
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