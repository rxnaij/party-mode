import React, { useState, useEffect } from 'react';

import FilledSongSlot from './FilledSongSlot';
import EmptySongSlot from './EmptySongSlot';

/*
 * Container for multiple SongSlots.
 *
 * props:
 * songs: list of a user's songs
 * slots: starting limit for songs per user
 * openModal(): activates DonateSlotModal in parent component
 * moveToAddSongsScreen(): switches parent display from App to AddSongsScreen
 * 
 * TODO:
 * prevent All from adding songs or rendering EmptySongSlots
*/
export default function SongWrapper (props) {

  const { songs, numSlots, initialSlots, openModal, moveToAddSongsScreen } = props;

  const [removeSongsPopup, setRemoveSongsPopup] = useState(false);

  // initial state
  const initialEmptySlots = () => {
    let list = [];
    for (let i = 0; i < numSlots || initialSlots; i++) {
      list.push(
        <EmptySongSlot openModal={openModal} moveToAddSongsScreen={moveToAddSongsScreen} key={i} />
      );
    }
    return list;
  }

  const [songSlots, setSlots] = useState(initialEmptySlots);

  /* Automatically updates song slots when any of the below variables are changed */
  useEffect (
    () => {

      const slotsToRender = songs.map((song, i) =>

        <FilledSongSlot
          key={`filledslot-${song.id}`}
          order={i}
          song={song}
          
        />

      );

      const numEmptySlots = (numSlots ? numSlots : initialSlots) - songs.length;

      for (let i = 0; i < numEmptySlots; i++) {
        slotsToRender.push(
          <EmptySongSlot
            key={`emptyslot-${i}`}
            openModal={openModal}
            moveToAddSongsScreen={moveToAddSongsScreen}
          />
        );

      }

      setSlots(slotsToRender)

    },
    // Variables determining when slot state changes
    [songs, numSlots, initialSlots, removeSongsPopup, openModal, moveToAddSongsScreen]
  )

  const popupStyle = {
    backgroundColor: 'gray',
    position: 'fixed',

    bottom: 0,
    left: 0,
    right: 0,
    height: '3rem'
  }

  return(
    <div>
      <fieldset onClick={event => console.log(event.target)}>
        { songSlots }
      </fieldset>
      <div>
        {
          removeSongsPopup && 
          <div style={popupStyle}>
            Remove songs?
            <button>
              Cancel
            </button>
          </div>
        }
        
      </div>
    </div>
  );
}