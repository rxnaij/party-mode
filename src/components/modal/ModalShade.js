/* 
 * Higher-order styling component for Modal components.
 * Closes modal when area outside of modal is clicked.
 * props:
 * close(): deactivates Modal in parent component
 */

import React from 'react'

const backgroundStyle = {
  zIndex: 1,
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: 'hsla(0,0%,0%,70%)'
}

const modalStyle={
  zIndex: 2,
  margin: '0 0.5rem',
  marginTop: '8rem',
  padding: '2rem',

  border: 'gray 1px solid',
  borderRadius: '4px',
  
  backgroundColor: '#222'
}

export default function ModalShade (props) {

  const { close } = props;

  return(
    <div 
      style={ backgroundStyle }
      onClick={ event => {
        event.target === event.currentTarget && close()
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