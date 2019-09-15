import React from 'react';

/*
 * Higher-order component for search results
 * props:
 * item: search result item to display in this search result
 */ 
export default function SearchResult (props) {
  const { name, imageURL, subtitle, clickAction, clickActionIcon } = props;

  return(
    <div 
      className="SearchResult" 
      style={{...props.style}}
    >
      <div className="ImageContainer">
        <img 
          src={imageURL} 
          alt={name}
          className="Image"
        />
      </div>
      <div className="SubtitleContainer">
        <h5>{name}</h5>
        {
          subtitle &&
          <h6>{subtitle}</h6>
        }
      </div>
      <div>
        {props.children}
      </div>
      <div
        className="ActionContainer"
        onClick={() => clickAction()}
      >
        {clickActionIcon}
      </div>
    </div>
  );
};