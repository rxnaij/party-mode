import React, { useState, useEffect } from 'react';
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

const SearchBox = props => {
  return(
    <div>
      <FontAwesomeIcon icon="search" />
      <label htmlFor="songSearch">Search for a song: </label>
      <input type="search" name="songSearch" id="songSearch" onChange={props.handleSearchInputChange}/>
      <button
        onClick={ () => 
          document.getElementById('songSearch').value = ''
        }
      >
        <FontAwesomeIcon icon="times" /> Clear search
      </button>
    </div>
  )
}

const SearchResults = props => {

  // const [query, setQuery] = useState('')

  const style = {
    border: '1px solid black',
    maxWidth: '720px',
    margin: '0 auto'
  };

  const results = props.query ? (
    props.searchResults.map(result => 
      <div style={style}>
        <h5>{result.name}</h5>
        <h6>
          {
            result.type + (
              result.type !== 'artist'
              ? ' by ' + result.artist
              : ''
            )
          }
        </h6>
      </div>
      )
    ) : (
      <div>
        <p>Search for a song, artist, album, etc.</p>
      </div>
    );

  return (
    <div>
      {results}
    </div>
  );
}

export default function AddSongs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(fakeData.searchResults);

  const handleSearchInputChange = event => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  useEffect( () => {
    // setSearchResults(searchQuery)  handles some kind of dynamic search filtering by query
  }, [searchQuery]);

  return(
    <div>
      <nav>
        <FontAwesomeIcon icon="times" />
        <h1 style={{ // Change this to flex justify-around
          display: 'inline-block', 
          marginLeft: '1rem'
        }}>
          Add song
        </h1>
        <SearchBox handleSearchInputChange={handleSearchInputChange} />
        <SearchResults query={searchQuery} searchResults={searchResults} />
      </nav>
    </div>
  );
};