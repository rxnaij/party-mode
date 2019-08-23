import React, { useState, useEffect } from 'react';

import SpotifyWebApi from 'spotify-web-api-js';

import ModalShade from './components/ModalShade';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

/*
 * TODO: replace this with an imported modal or something that's
 * more refined. Thinking about the logic from scratch is a waste!
 * props:
 * user: user
 * close(): removes modal from parent component
 */
const DuplicateSongModal = props => {
  return(
    <ModalShade close={props.close}>
      <h4>Duplicate song</h4>
      <h3>{props.user.name} has already added this song. Add it anyway?</h3>
      <button onClick={() => props.close()}>
        Yes, I love it that much!
      </button>
      <button onClick={() => {
        props.rejectSong();
        props.close();
      }}>
        No, that would be awkward.
      </button>
    </ModalShade>
  )
}

const SearchBox = props => {

  const { handleSearchInputChange } = props;

  const searchInputStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '100%'
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
          onClick={ () =>  document.getElementById('songSearch').value = ''}
        />
      </div>
    </div>
      
  )
}

/*
 * Higher-order component for search results
 * props:
 * item: search result item to display in this search result
 */ 
const SearchResult = props => {
  const { item, action } = props;

  const style = {
    // border: '1px solid black',
    maxWidth: '720px',
    margin: '0 auto',

    fontSize: '0.9rem',
  };

  const flexContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: '0.5rem',
  }

  const fakeImg = {
    backgroundColor: 'gray',
    width: '3rem',
    height: '3rem',
    borderRadius: '4px',
    boxShadow: '0px 4px 8px hsla(0,0%,0%,0.3)',
  };

  return(
    <div style={{...style, ...flexContainer, ...props.style}}>
      <div style={fakeImg}></div>
      <div id="track-title-and-type" style={{
        flexDirection: 'column',
        flexGrow: 2,

        paddingLeft: '1.25rem'
      }}>
        <h5>{item.name}</h5>
        <h6>
          {
            item.type + (
              item.type === 'artist'
                ? ''
                : ' by ' + item.artist
            )
          }
        </h6>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
};

/*
 *
 * props:
 * track: the track whose data is displayed in this search result
 * openDuplicateModal(): opens duplicate song modal in parent
 * addSongCallbacks()
 */
const TrackSearchResult = props => {
  const [isAdded, setIsAdded] = useState(false);
  const [willAdd, setWillAdd] = useState(true);
  const [duplicateSongModalIsVisible, setDuplicateSongModal] = useState(false);
  
  const duplicateOwner = props.addSongCallbacks.checkForExistingSongOwner(props.item);

  const addButtonStyle_notAdded = {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  }
  const addButtonStyle_added = {
    ...addButtonStyle_notAdded,
    backgroundColor: 'darkgray'
  }
  const wasAddedStyle = {
    backgroundColor: 'lightgray',
    color: 'gray'
  }

  return(
    <SearchResult 
      item={props.item} 
      style={ isAdded && wasAddedStyle }
    >
      <div
        className="TrackSearchResult"
        style={isAdded ? addButtonStyle_added : addButtonStyle_notAdded}
        onClick={() => {
          if (!isAdded) {

            if (duplicateOwner) {
              setDuplicateSongModal(true);
            }

            if (willAdd) {
              props.addSongCallbacks.addSong(props.item);
              setIsAdded(true);
            }

          }
        }}
      >
        <FontAwesomeIcon icon={isAdded ? "times" : "plus"} />
      </div>
      {
        duplicateSongModalIsVisible &&
        <DuplicateSongModal
          user={duplicateOwner}
          rejectSong={() => setWillAdd(false)}
          close={() => setDuplicateSongModal(false)}
        />
      }
    </SearchResult>
  )
};

// TODOs:
// eslint-disable-next-line
const AlbumSearchResult = () => {}
// eslint-disable-next-line
const ArtistSearchResult = () => {}

/*
 *
 * props:
 * users: list of users in parent
 * query: search query entered into 
 * searchResults: list of search results from query
 * addSong(): adds track to current user's song list
 * openDuplicateModal(): triggers popup asking if duplicate song is OK
 */ 
const SearchResultsGroup = props => {
  return (
    <div>
      {
        props.query ? (
          props.searchResults.map((result, i) => {
            const key = `search-result-${i}`;
            if (result.type === 'track')
              return (
                <TrackSearchResult
                  key={key}
                  item={result} 
                  addSongCallbacks={props.addSongCallbacks}
                />
              )
            else
              return(
                <SearchResult 
                  key={key}
                  item={result} 
                />
              )
            })
            // differentiate by track, album, artist results
          ) : (
          <div>
            <p>Search for a song, artist, album, etc.</p>
          </div>
        )
      }
    </div>
  );
}

/*
 * Interface for current user to search for a song and add it to one of their 
 * song slots
 * props:
 * currentUser: current user specified in parent component (App)
 * addSongCallBacks:
 *    addSong(): adds song to current user in parent
 *    checkForExistingSongOwner(): checks if a song is already owned by a user in parent
 */ 
export default function AddSongsScreen (props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(fakeData.searchResults);
  // Prop methods from parent app
  //eslint-disable-next-line
  const { backToApp, addSong, checkForExistingSongOwner } = props.addSongCallbacks;
  const { accessToken } = props;

  const handleSearchInputChange = event => {
    const { value } = event.target;
    setSearchQuery(value);
  };
  // encodes search query to valid Spotify search query
  // eslint-disable-next-line
  const writeQuery = (query) => {}
  // Submits search query to Spotify, returns search results
  // eslint-disable-next-line
  const fetchSearchResultsFromQuery = async (query) => {
    // const searchResults = await query => (ping Spotify API for search results)
    // setSearchResults();

    const testQuery = 'q=' + 'hey+jude' + '&'
    const testType = 'type=' + 'track'
    const endpoint = 'https://api.spotify.com/v1/search'
    const searchQuery = endpoint + '?' + testQuery + testType

    console.log(searchQuery)

    const response = await fetch(searchQuery, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    });
    const data = await response.json()
    
    
  };

  useEffect(() => {
    // setSearchResults(searchQuery)  handles some kind of dynamic search filtering by query
    fetchSearchResultsFromQuery('')
  }, [searchQuery]);

  return(
    <div>

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
        
        <SearchBox handleSearchInputChange={handleSearchInputChange} />
        
      </nav>

      <div className="section-divider"></div>

      <div>
        {
          searchQuery ? (
            <SearchResultsGroup
              query={searchQuery}
              searchResults={searchResults}
              addSongCallbacks={props.addSongCallbacks}
              openDuplicateModal={() => this.setDuplicateSongModal(true)}
            />
          ) : (
            <div style={{
              margin: '0 auto',
              textAlign: 'center'
            }}>
              Play what you love: search for artists, songs, podcasts, and more.
            </div>
          )
        }
      </div>
    </div>
  );
};