import React from 'react';
import Profile from './Profile';

export default function ProfileRow (props) {

  const { profiles, currentUser, setAsCurrentUser } = props;

  const profileRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: '1rem'
  }
  
  return(
    <div
      style={profileRowStyle}
    >
      {
        profiles.map(user =>
          <Profile 
            key={`profile+${user.id}`}
            user={user}
            isCurrentUser={currentUser === user}
            setAsCurrentUser={() => setAsCurrentUser(user)}
          />
        )
      }
    </div>
  )
}