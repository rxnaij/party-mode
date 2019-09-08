import React from 'react';
import MusicSearchResult from './MusicSearchResult';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODOs:
export default function AlbumSearchResult (props) {
  const { item, getAlbumTracks } = props;

  const { id, name, artists, type } = item;

  const clickAction = () => {
    const images = item.images;
    const loc = images.length - 1;
    const imageURL = loc > 0 ? images[loc].url : null;

    getAlbumTracks(id, item);
  }
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