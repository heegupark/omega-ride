import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

const InputTextField = withStyles({
  root: {
    '& label': {
      paddingLeft: '30px',
      color: 'white'
    },
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiInputBase-input': {
      paddingLeft: '35px',
      backgroundColor: 'transparent',
      color: 'white',
      borderRadius: '7px',
      border: '1px solid rgb(128,128,131)'
    },
    '& .MuiInputBase-input:hover': {
      backgroundColor: 'transparent',
      color: 'white',
      borderRadius: '7px',
      border: '1px solid rgb(128,128,131)'
    },
    '& .MuiInputBase-input:focus': {
      paddingLeft: '35px',
      border: '1px solid white'
    },
    borderRadius: 5,
    width: '100%',
    height: '100%'
  }
})(TextField);

export default function RideDetail() {
  const [pickupValue, setPickupValue] = useState(undefined);
  const [dropoffValue, setDropoffValue] = useState(undefined);

  return (
    <div className="position-absolute fixed-bottom ride-detail-container ride-dark">
      <div className="info-box">
        <span className="text-white">Welcome to o-ride!</span>
      </div>
      <div className="mt-3">
        <h4 className="text-white text-bolder">Where are you going?</h4>
      </div>
      <div className="my-3 mx-auto">
        <div className="my-2">
          <div className="dot-box text-center position-absolute">
            <span className="purple">
              <i className="fas fa-dot-circle"></i>
            </span>
          </div>
          <InputTextField
            className="caret-purple"
            id="pickup-input"
            label="Enter a pickup location"
            type="text"
            autoComplete="off"
            variant="filled"
            value={pickupValue || ''}
            onChange={e => setPickupValue(e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
          {pickupValue
            ? <div className="clear-box text-center position-absolute">
              <span
                className="text-white cursor"
                onClick={() => setPickupValue('')}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            : ''
          }
        </div>
        <div className="my-2">
          <div className="dot-box text-center position-absolute">
            <span className="pink">
              <i className="fas fa-dot-circle"></i>
            </span>
          </div>
          <InputTextField
            className="caret-pink"
            id="dropoff-input"
            label="Enter a drop-off location"
            type="text"
            autoComplete="off"
            variant="filled"
            value={dropoffValue || ''}
            onChange={e => setDropoffValue(e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
          {dropoffValue
            ? <div className="clear-box text-center position-absolute">
              <span
                className="text-white cursor"
                onClick={() => setDropoffValue('')}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            : ''
          }
        </div>
      </div>
      <div className="ride-btn-box text-center position-absolute">
        <hr className="line"></hr>
        <button disabled className="ride-detail-btn">Ride detail</button>
      </div>
    </div>
  );
}
