import React, { useState } from 'react';
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
 * Notes:
 * **Potential new logic:
 * Create an array with $initialSlots number of EmptySongSlots
 * find() EmptySongSlots
 * Remove (or replace?)
*/
export default function SongWrapper (props) {

  const { songs, slots, initialSlots, openModal, moveToAddSongsScreen } = props;

  const [removeSongsPopup, setRemoveSongsPopup] = useState(false);

  /* Fills an array with FilledSongSlots for each song
     that a user has already added.
     Then EmptySongSlots are added to the array until 
     the array's length becomes equal to their .slots property. 
  */

  const numEmptySlots = (slots ? slots : initialSlots) - songs.length;

  const slotsToRender = songs.map((song, i) =>
    <FilledSongSlot
      key={`filledslot-${song.name}-${i}`}
      order={i}
      song={song}
      triggerRemoveSongsPopup={() => {setRemoveSongsPopup(!removeSongsPopup); console.log('new value: ', removeSongsPopup)}}
    />
  );
  for (let i = 0; i < numEmptySlots; i++) {
    slotsToRender.push(
      <EmptySongSlot
        key={`emptyslot-${i}`}
        openModal={openModal}
        moveToAddSongsScreen={moveToAddSongsScreen}
      />
    );
  }
  return(
    <div>
      <fieldset>
        { slotsToRender }
      </fieldset>
      <div>
        {
          removeSongsPopup && 
          <div style={{
            backgroundColor: 'gray',
            position: 'fixed',

            bottom: 0,
            left: 0,
            right: 0,
            height: '3rem'
          }}>
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