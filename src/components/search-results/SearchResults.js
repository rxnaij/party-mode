import React, { useState } from 'react';

import DuplicateSongModal from '../modal/DuplicateSongModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
 * Higher-order component for search results
 * props:
 * item: search result item to display in this search result
 */ 
const SearchResult = props => {
  const { item, action, imageURL } = props;

  const style = {
    // border: '1px solid black',
    maxWidth: '720px',
    margin: '0 auto',

    fontSize: '0.9rem',

    borderRadius: '2px'
  };

  const flexContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: '0.5rem',
  }

  const imageContainer = {

    width: '3rem',
    height: '3rem'
    
  };
  const imageStyle = {
    zIndex: '2',

    width: 'inherit',
    height: 'inherit',

    borderRadius: '4px',
    boxShadow: '0px 4px 8px hsla(0,0%,0%,0.3)',
  }

  const artists = item.artists 
                  ? item.artists.reduce((artistList, artist) => 
                      artistList.concat(artist.name), []).join(', ') 
                  : null;

  return(
    <div style={{...style, ...flexContainer, ...props.style}}>
      <div style={imageContainer}>
        <img 
          src={imageURL} 
          alt={item.name}
          style={imageStyle}
        />
      </div>
      <div id="track-title-and-type" style={{
        flexDirection: 'column',
        flexGrow: 2,

        paddingLeft: '1.25rem'
      }}>
        <h5>{item.name}</h5>
        <h6>
          {
            item.type + (
              item.type !== 'artist'
                ? ' by ' + artists
                : ''
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

  const { item, addSongCallbacks } = props;

  const [isAdded, setIsAdded] = useState(false);
  const [willAdd, setWillAdd] = useState(true);
  const [duplicateSongModalIsVisible, setDuplicateSongModal] = useState(false);
  
  const duplicateOwner = addSongCallbacks.checkForExistingSongOwner(item);

  const addButtonStyle_notAdded = {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',

    border: '2px solid white',

    backgroundColor: 'transparent',
    color: 'white',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const addButtonStyle_added = {
    ...addButtonStyle_notAdded,
    backgroundColor: 'green',
    border: 0,
  }
  const wasAddedStyle = {
    backgroundColor: 'lightgray',
    color: 'gray'
  }

  const images = item.album.images
  const loc = images.length - 1
  const imageURL = loc > 0 ? images[loc].url : null

  return(
    <SearchResult 
      item={item} 
      imageURL={imageURL}
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
              addSongCallbacks.addSong(item);
              setIsAdded(true);
            }

          } else {
            addSongCallbacks.removeSong(item);
            setIsAdded(false);
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
const AlbumSearchResult = props => {
  const { item } = props

  const imageLoc = item.images.length - 1
  const imageURL = imageLoc > 0 ? item.images[imageLoc].url : null

  return(
    <SearchResult
      item={item}
      imageURL={imageURL}
    >
      <div>
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </SearchResult>
  )
}
// eslint-disable-next-line
const ArtistSearchResult = props => {
  const { item } = props

  const imageLoc = item.images.length - 1
  const imageURL = imageLoc > 0 ? item.images[imageLoc].url : null

  return(
    <SearchResult
      item={item}
      imageURL={imageURL}
    >
      <div>
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </SearchResult>

  )
}

/*
 *
 * props:
 * users: list of users in parent
 * searchResults: list of search results from query
 * addSong(): adds track to current user's song list
 * openDuplicateModal(): triggers popup asking if duplicate song is OK
 */ 
const SearchResultsGroup = props => {

  const { searchResults, addSongCallbacks } = props;

  return (
    searchResults ? (
      <div>
        <h3>Tracks</h3>
        {
          searchResults.tracks.items.length > 0 ? (
            searchResults.tracks.items.slice(0,4).map(track => 
              <TrackSearchResult
                key={track.id}
                item={track}
                addSongCallbacks={addSongCallbacks}
              />
            )
          ) : (
            <div>
              No results for tracks
            </div>
          )
        }
        <h3>Albums</h3>
        {
          searchResults.albums.items.length > 0 ? (
            searchResults.albums.items.slice(0,4).map(album =>
              <AlbumSearchResult
                key={album.id}
                item={album}
              />
            )
          ) : (
            <div>No results for albums</div>
          )
        }
        <h3>Artists</h3>
        {
          searchResults.artists.items.length > 0 ? (
            searchResults.artists.items.slice(0,4).map(artist =>
              <ArtistSearchResult 
                key={artist.id}
                item={artist}
              />
            )
          ) : (
            <div>No results for artists</div>
          )
        }
      </div>
    ) : (
      <div>
        <p>Start typing above to search for your favorite tracks, albums, and artists.</p>
      </div>
    )
  );
}

export default SearchResultsGroup;
