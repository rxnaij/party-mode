/* 
 * Higher-order styling component for Modal components.
 * Closes modal when area outside of modal is clicked.
 * props:
 * close(): deactivates Modal in parent component
 */

import React from 'react'

export default function ModalShade (props) {
  const backgroundStyle = {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'hsla(0,0%,0%,50%)'
  }

  const modalStyle={
    zIndex: 2,
    display: 'inline-block',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white'
  }

  return(
    <div 
      style={ backgroundStyle }
      onClick={ event => {
        event.target === event.currentTarget && props.close()
      }}
    >
      <div 
        style={ modalStyle }
      >
        { props.children }
      </div>
    </div>
  )
};