import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  top: '0.3rem',

  color: '#000000'
}

export default function SearchBox (props) {

  const { handleSearchInputChange, clearInput, searchQueryInput } = props;

  return(
    <div className="form-section">
      <div style={{
        marginBottom: '0.5rem'
      }}>
        <FontAwesomeIcon icon="search" />
        <label htmlFor="songSearch" style={{ marginLeft: '0.5rem' }}>Search for a song: </label>
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
          value={searchQueryInput}
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