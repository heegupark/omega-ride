import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const CustomTextField = withStyles({
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
      borderRadius: '4px',
      border: '1px solid rgb(128,128,131)',
      caretColor: 'rgb(175,140,244)'
    },
    '& .MuiInputBase-input:hover': {
      backgroundColor: 'transparent',
      color: 'white',
      borderRadius: '4px',
      border: '1px solid rgb(128,128,131)',
      caretColor: 'rgb(175,140,244)'
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
  return (
    <div className="position-absolute fixed-bottom ride-detail-position ride-dark">
      <div className="info-box">
        <span className="text-white">Welcome to o-ride!</span>
      </div>
      <div className="mt-3">
        <h4 className="text-white text-bolder">Where are you going?</h4>
      </div>
      <div className="my-3 mx-auto">
        <div className="dot-box text-center position-absolute">
          <span className="purple">
            <i className="fas fa-dot-circle"></i>
          </span>
        </div>
        <div>
          <CustomTextField
            id="filled-pickup-input"
            label="Enter a pickup location"
            type="search"
            autoComplete="off"
            variant="filled"
          />
        </div>
      </div>
    </div>
  );
}
