import React from 'react';
import SearchResult from './SearchResult';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ArtistSearchResult (props) {
  const { item } = props

  const { name } = item;

  const imageLoc = item.images.length - 1
  const imageURL = imageLoc > 0 ? item.images[imageLoc].url : null

  const clickActionIcon = <FontAwesomeIcon icon="chevron-right" />;

  return(
    <SearchResult
      name={name}
      imageURL={imageURL}
      clickActionIcon={clickActionIcon}
    >
    </SearchResult>

  )
}