import React from 'react';
import SearchResult from './SearchResult'

export default function MusicSearchResult (props) {

  const { name, album, artists, type, clickAction, clickActionIcon } = props;

  const a = artists.reduce((artistList, artist) => 
              artistList.concat(artist.name), []).join(', ');

  const subtitle = `${type} by ${a}`;

  const images = album.images;
  const loc = images.length - 1;
  const imageURL = loc > 0 ? images[loc].url : null

  return (
    <SearchResult
      name={name}
      imageURL={imageURL}
      clickAction={clickAction}
      clickActionIcon={clickActionIcon}
      subtitle={subtitle}
    >
      { props.children }
    </SearchResult>
  );
}