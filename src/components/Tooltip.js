import React from 'react';

export default function Tooltip(props) {
  const { close } = props;

  const style = {
    position: 'absolute',
    top: '0.5rem',
  };

  return (
    <div 
      style={style}
      onClick={() => close()}
    >
      {props.children}
    </div>
  );
}