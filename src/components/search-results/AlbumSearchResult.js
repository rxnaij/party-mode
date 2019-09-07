import React from 'react';
import MusicSearchResult from './MusicSearchResult';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODOs:
export default function AlbumSearchResult (props) {
  const { item, getAlbumTracks } = props;

  const { id, name, artists, type } = item;

  const clickAction = () => getAlbumTracks(id);
  const clickActionIcon = <FontAwesomeIcon icon="chevron-right" />;

  return(
    <MusicSearchResult
      name={name}
      artists={artists}
      album={item}
      type={type}
      clickAction={clickAction}
      clickActionIcon={clickActionIcon}
    >
    </MusicSearchResult>
  );
}