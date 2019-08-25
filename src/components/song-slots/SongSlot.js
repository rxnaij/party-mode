import React from 'react'

/*
 * Higher-order styling component for song slots
 */
const SongSlot = props => {
  const songSlotStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    border: '2px solid gray',
    borderRadius: '8px',

    maxWidth: '720px',
    minHeight: '60px',
    margin: '0 auto',
    marginBottom: '0.5rem',

    padding: '0.75rem 1rem'
  };

  return(
    <div style={{...songSlotStyle, ...props.style}}>
      {props.children}
    </div>
  );
};

export default SongSlot;