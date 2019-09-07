import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBox (props) {

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