import React from 'react'
import ModalShade from './ModalShade'

/*
 * TODO: replace this with an imported modal or something that's
 * more refined. Thinking about the logic from scratch is a waste!
 * props:
 * user: user
 * close(): removes modal from parent component
 */
export default function DuplicateSongModal(props) {
  return(
    <ModalShade close={props.close}>
      <h4>Duplicate song</h4>
      <h3>{props.user.name} has already added this song. Add it anyway?</h3>
      <button onClick={() => props.close()}>
        Yes, I love it that much!
      </button>
      <button onClick={() => {
        props.rejectSong();
        props.close();
      }}>
        No, that would be awkward.
      </button>
    </ModalShade>
  )
}