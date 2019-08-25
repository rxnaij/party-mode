import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tooltip from '../Tooltip';

/*
 * Displays total count of a given value
 * props:
 * name: name of value
 * value: value to be counted
 */ 
const TotalCounter = props => {

  const { name, icon, value } = props;

  const [tooltipIsVisible, setTooltip] = useState(false);

  const style = {
    display: 'inline-block',
    marginRight: '1rem',
  }

  const selected = {
    backgroundColor: 'gray'
  }

  return (
    <div style={style}>
      <div style={tooltipIsVisible ? selected : null}>
        {
          icon
            ? <FontAwesomeIcon 
                icon={icon} 
                style={{marginRight: '0.25rem'}} 
                onClick={() => setTooltip(!tooltipIsVisible)}
              /> 
            : `Total ${name}:`
        }
        {value}
      </div>
      <div style={{position: 'relative'}}>
        {
          tooltipIsVisible &&
          <Tooltip close={() => setTooltip(false)}>
            Total {name} in this playlist
          </Tooltip>
        }
      </div>
    </div>
  );
};

export default TotalCounter;