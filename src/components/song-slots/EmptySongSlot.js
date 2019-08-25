import React from 'react';
import SongSlot from './SongSlot';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/*
 * An empty song slot that can be occupied by song data or traded to another user.
 * props:
 * openModal(): opens DonateSlotModal in parent component
 * moveToAddSongsScreen(): switches App to AddSongsScreen
 * TODO: add add song functionality
 */
export default function EmptySongSlot (props) {

  const { openModal, moveToAddSongsScreen } = props;

  const emptySongSlotStyle = {
    border: '2px solid gray',

    boxShadow: 'inset 0px 4px 8px hsla(0, 0%, 0%, 0.35)'
  }

  return(
    <SongSlot
      style={emptySongSlotStyle}
    >
      <button
        className="secondary"
        onClick={() => moveToAddSongsScreen()}
      >
        <FontAwesomeIcon icon="plus" />
        <span>Add song</span>
      </button>
      <button 
        className="secondary"
        onClick={() => openModal()}
      >
        <FontAwesomeIcon icon="hands" />
        <span>Donate slot to friend</span>
      </button>
    </SongSlot>
  )
};