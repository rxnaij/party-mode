import React from 'react'

/*
 * A user profile avatar. When clicked, sets user as current user in parent component.
 * props:
 * user: the user represented on this profile
 * setAsCurrentUser: sets user as current user in app
 */ 
export default function Profile (props) {

  const { user, isCurrentUser, setAsCurrentUser } = props;

  const profileStyle = {
    paddingBottom: '0.5rem',

    textAlign: 'center',
    fontSize: '0.75rem',
    cursor: 'pointer'
  }

  const isCurrentUserStyle = {
    ...profileStyle,
    fontWeight: 'bold',
    boxShadow: '0px 2px #0DC181'
  }

  const profileImgStyle = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',

    margin: '0 auto',
    marginBottom: '0.25rem',

    backgroundColor: isCurrentUser ? '#A1FFCF' : 'lightgray',
    color: 'black',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: '1rem',
    textAlign: 'center'
  }

  return(
    <div
      key={user.id}
      style={isCurrentUser ? isCurrentUserStyle : profileStyle}
      onClick={() => setAsCurrentUser()}
    >
      <div style={profileImgStyle}>
        {user.name[0]}
      </div>
      <div>
        {user.name}
      </div>
      <div>
        {user.songs.length}
      </div>
    </div>
  )
};