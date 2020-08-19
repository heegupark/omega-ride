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
      paddingLeft: '40px',
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
      paddingLeft: '40px',
      border: '1px solid white'
    },
    borderRadius: 5,
    width: '100%',
    height: '100%'
  }
})(TextField);

export default function RideDetail(props) {
  const [pickupValue, setPickupValue] = useState(undefined);
  const [list, setList] = useState({ predictions: [] });
  const [dropoffValue, setDropoffValue] = useState(undefined);

  function getAddress(value) {
    if (value) {
      fetch(`/api/address/${value}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Something went wrong!');
          }
        })
        .then(data => {
          setList({ predictions: data.predictions });
        })
        .catch(error => console.error(error.message));
    }
  }

  function getLatLng(address) {
    if (address) {
      fetch(`/api/latlng/${address}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Something went wrong!');
          }
        })
        .then(data => {
          props.setCoordinates(data.results[0].geometry.location);
        })
        .catch(error => console.error(error.message));
    }
  }
  // useEffect(() => getAddress(pickupValue), [pickupValue]);

  function setValue(value, category, action) {
    if (action === 'address') {
      getAddress(value);
    } else if (action === 'coordinate') {
      getLatLng(value);
    }
    if (category === 'pickup') {
      setPickupValue(value);
    } else if (category === 'dropoff') {
      setDropoffValue(value);
    }
    setList({ predictions: [] });
  }

  return (
    <div className="position-absolute fixed-bottom ride-detail-container ride-dark px-3 pt-3">
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
            onChange={e => setValue(e.target.value, 'pickup', 'address')}
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
            onChange={e => setValue(e.target.value, 'dropoff', 'address')}
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
      {list && list.predictions.map((data, index) => {
        const address = data.description.split(',')[0];
        const city = data.description.split(',')[1];
        return (
          <div
            key={index}
            className="row px-4 address-detail-box py-2 cursor"
            onClick={() => setValue(data.description, '', 'coordinate')}>
            <div className="my-auto mx-auto col-sm-1 text-center address-head bg-purple">
              <i className="marker-custom fas fa-map-marker-alt"></i>
            </div>
            <div className="col-sm">
              <p className="text-white mb-0">{address}</p>
              <p className="text-gray mb-0">{city}</p>
            </div>
          </div>
        );
      })}
      <div className="ride-btn-box text-center position-absolute">
        <hr className="line"></hr>
        <button disabled className="ride-detail-btn">Ride detail</button>
      </div>
    </div>
  );
}
