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
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'hsla(0,0%,0%,50%)'
  }

  const modalStyle={
    zIndex: 2,

    position: 'fixed',
    top: '8rem',
    margin: '0 auto',
    padding: '2rem',
    
    backgroundColor: 'inherit'
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