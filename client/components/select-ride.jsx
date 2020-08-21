import React, { useState, useEffect } from 'react';
import Vehicles from './vehicles';
import TripDetail from './trip-detail';
import PaymentSummary from './payment-summary';
import RiderSelected from './rider-selected';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    },
    marginLeft: '43%'
  }
}));

function SelectRide(props) {
  const classes = useStyles();
  const [tripDistance, setTripDistance] = useState(null);
  const [riderDistance, setRiderDistance] = useState(null);
  const [requestedRider, setRequestedRider] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  function getDistance(category, origin, destination) {
    // const { origin, destination, rider } = props;
    const body = { origin, destination };
    fetch('/api/distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    ).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong!');
      }
    })
      .then(data => {
        if (category === 'trip') { setTripDistance(data.distance); }
        if (category === 'rider') { setRiderDistance(data.distance); }
      })
      .catch(error => console.error(error.message));
  }
  useEffect(() => getDistance('trip', props.origin, props.destination), []);

  function requestRideBtn() {
    const requestedTime = Math.random(0, 1) * 2000;
    const diff = Math.random(0, 1) * 0.05;
    const lat = Number((props.origin.lat - diff).toFixed(4));
    const lng = Number((props.origin.lng - diff).toFixed(4));
    const rider = { lat, lng };
    props.setRider(rider);
    getDistance('rider', props.origin, rider);
    setRequestedRider(true);
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
    }, requestedTime);
  }

  function startOver() {
    setIsRequesting(false);
    setRequestedRider(false);
    props.setView('set-destination');
  }

  const estimate = tripDistance ? Number(tripDistance.split(' ')[0]) * 2 : 10;
  const approachEstimate = riderDistance ? Math.floor(Number(riderDistance.split(' ')[0])) : 10;
  const { vehicles, select, setSelect, estimateWeight } = props;
  return (
    <>
      <div className="box-520px">
        {requestedRider
          ? isRequesting
            ? (
              <div className="my-1">
                <div className={classes.root}>
                  <CircularProgress
                    className="mt-100p"
                    color="secondary" />
                </div>
              </div>
            )
            : (
              <>
                <RiderSelected
                  select={select}
                  setSelect={setSelect}
                  approachEstimate={approachEstimate}
                  estimate={estimate}
                  estimateWeight={estimateWeight}
                />
              </>
            )
          : (
            <>
              <div className="my-1">
                <h4 className="text-white text-bolder">Fare estimate</h4>
                <p className="font-12px text-danger mb-0">* This is not real estimates.</p>
                <p className="font-12px text-gray mb-0">Sample fares are estimates only and do not reflect variations due to discounts, traffic delays or other factors.</p>
              </div>
              <div className="my-3">
                <Vehicles
                  vehicles={vehicles}
                  select={select}
                  setSelect={setSelect}
                  estimate={estimate}
                  estimateWeight={estimateWeight}
                />
              </div>
            </>
          )
        }
      </div>
      <div className="row line-thick"></div>
      <div className="my-3">
        <TripDetail
          pickupValue={props.pickupValue}
          dropoffValue={props.pickupValue}
          setView={props.setView}
        />
      </div>
      <div className="row line-thick"></div>
      <div className="my-3">
        <PaymentSummary
          vehicles={vehicles}
          select={select}
          estimate={estimate}
          estimateWeight={estimateWeight}
        />
      </div>
      <div className="ride-btn-box text-center position-absolute">
        <hr className="line"></hr>
        {requestedRider
          ? <button
            disabled={isRequesting}
            onClick={() => startOver()}
            className={`ride-detail-btn bg-purple text-bolder ${isRequesting ? 'bg-pink-btn-disabled' : 'bg-pink-btn'}`}>{'start over'}</button>
          : <button
            onClick={() => requestRideBtn()}
            className="ride-detail-btn bg-purple text-bolder bg-purple-btn">request ride</button>
        }

      </div>
    </>
  );
}

export default SelectRide;
