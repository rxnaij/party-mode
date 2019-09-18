import React, { useState, useEffect } from 'react'
import MusicSearchResult from './MusicSearchResult'
import DuplicateSongModal from '../modal/DuplicateSongModal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

/*
 *
 * props:
 * item: the track whose data is displayed in this search result
 * openDuplicateModal(): opens duplicate song modal in parent
 * addSongCallbacks()
 * 
 * Proposed changes:
 * album data:
 * album images --> URL
 * 
 */
export default function TrackSearchResult (props) {

  const { item, addSongCallbacks } = props;

  const { id, album, artists, name, type } = item;

  // Process information

  const [isAdded, setIsAdded] = useState(false);
  const [willAdd, setWillAdd] = useState(true);
  const [duplicateSongModalIsVisible, setDuplicateSongModal] = useState(false);
  
  const duplicateOwner = addSongCallbacks.checkForExistingSongOwner(id);

  const clickAction = () => {
    if (!isAdded) {

      if (duplicateOwner) {
        setDuplicateSongModal(true);
      }

      if (willAdd) {
        addSongCallbacks.addSong(item);
        setWillAdd(false)
      }
      setIsAdded(true);
      console.log("Song added")

    } else {
      addSongCallbacks.removeSong(item);
      setIsAdded(false);
    }
  }

  const ClickActionIcon = props => (
    <div
      className="itemSearchResult"
      style={props.style}
    >
      <FontAwesomeIcon icon={props.isAdded ? "times" : "plus"} />
    </div>
  );
  

  return(
    <MusicSearchResult
      name={name}
      artists={artists}
      album={album}
      type={type}
      clickAction={clickAction}
      clickActionIcon={<ClickActionIcon isAdded={isAdded} style={isAdded ? addButtonStyle_added : addButtonStyle_notAdded }/>}
      style={isAdded && wasAddedStyle}
    >
      {
        duplicateSongModalIsVisible &&
        <DuplicateSongModal
          user={duplicateOwner}
          rejectSong={() => setWillAdd(false)}
          close={() => setDuplicateSongModal(false)}
        />
      }
    </MusicSearchResult>
  )
};


