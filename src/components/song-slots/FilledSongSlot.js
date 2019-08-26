import React, { useState } from 'react';
import SongSlot from './SongSlot';

import ModalShade from '../modal/ModalShade';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/*
 * A slot containing a song
 * props:
 * song: song data for this slot
 */
export default function FilledSongSlot (props) {

  const { song, triggerRemoveSongsPopup } = props;

  const [isSelected, setIsSelected] = useState(false);

  const filledSongSlotStyle = {
    fontSize: '0.9rem',
    border: '0px',

    color: 'white',
    backgroundImage: 'linear-gradient(to right top, #207155, #1c9068, #14b07a, #08d18c, #00f39d)',
  }

  const artists = song.artists ? song.artists.reduce((artistList, artist) => 
                    artistList.concat(artist.name)
                  , []).join(', ') : null;

  return(
    <SongSlot style={filledSongSlotStyle}>
      <div>
        <input 
          type="checkbox" name="" className="song-checkbox" id="" 
          onClick={event => {
            setIsSelected(event.target.checked)
          }}
        />
      </div>
      
      <div
        style={{
          flexGrow: '2',
          paddingLeft: '1.25rem'
        }}
      >
        <h5>{song.name}</h5>
        <h6>{song.artist || artists}</h6>
      </div>
      <div>
       <FontAwesomeIcon icon="play-circle" />
      </div>

    </SongSlot>
  )
};