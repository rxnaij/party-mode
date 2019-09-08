import React from 'react';
import SearchResult from './SearchResult';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ArtistSearchResult (props) {
  const { item, getArtistResults } = props

  const { id, name } = item;

  const imageLoc = item.images.length - 1
  const imageURL = imageLoc > 0 ? item.images[imageLoc].url : null

  const clickAction = () => {
    getArtistResults(id);
  }
  const clickActionIcon = <FontAwesomeIcon icon="chevron-right" />;

  return(
    <SearchResult
      name={name}
      imageURL={imageURL}
      clickAction={clickAction}
      clickActionIcon={clickActionIcon}
    >
    </SearchResult>

  )
}