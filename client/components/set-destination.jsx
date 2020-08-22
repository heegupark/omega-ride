import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

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

function SetDestination(props) {
  const { pickupValue, setCategory, setValue, dropoffValue, clearFields, list, category } = props;
  // const reqBtnDisabled = props.origin && props.destination;
  return (
    <>
      <div className="info-box">
        <p className="text-white mb-0">{'Welcome to o-ride!'}</p>
        <p className="text-danger mb-0">{'* This is demonstration purpose.'}</p>
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
            onClick={() => setCategory('pickup')}
            onChange={e => setValue(e.target.value, 'pickup', 'address')}
            InputProps={{ disableUnderline: true }}
          />
          {pickupValue
            ? <div className="clear-box text-center position-absolute">
              <span
                className="text-white cursor"
                onClick={() => clearFields('pickup')}>
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
            onClick={() => setCategory('dropoff')}
            onChange={e => setValue(e.target.value, 'dropoff', 'address')}
            InputProps={{ disableUnderline: true }}
          />
          {dropoffValue
            ? <div className="clear-box text-center position-absolute">
              <span
                className="text-white cursor"
                // onClick={() => setDropoffValue('')}>
                onClick={() => clearFields('dropoff')}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            : ''
          }
        </div>
      </div>
      {
        list && list.predictions.map((data, index) => {
          const address = data.description.split(',')[0];
          const city = data.description.split(',')[1];
          const bgColor = category === 'pickup' ? 'bg-purple' : 'bg-pink';
          return (
            <div
              key={index}
              className="d-flex px-4 address-detail-box py-2 cursor"
              onClick={() => setValue(data.description, category, 'coordinate')}>
              <div className={`my-auto w-10p text-center address-head ${bgColor}`}>
                <i className="marker-custom fas fa-map-marker-alt"></i>
              </div>
              <div className="w-90p pl-3">
                <p className="text-white mb-0">{address}</p>
                <p className="text-gray mb-0">{city}</p>
              </div>
            </div>
          );
        })
      }
    </>
  );
}

export default SetDestination;
