import React, { useEffect } from 'react';
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

  useEffect(() => props.getDistance('trip', props.origin, props.destination), []);

  const estimate = props.tripDistance ? Number(props.tripDistance.split(' ')[0]) * 2 : 10;
  const approachEstimate = props.riderDistance ? Math.floor(Number(props.riderDistance.split(' ')[0])) : 10;
  const { requestedRider, isRequesting, vehicles, select, setSelect, estimateWeight } = props;
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
      <div className="line-thick"></div>
      <div className="my-3">
        <TripDetail
          pickupValue={props.pickupValue}
          dropoffValue={props.pickupValue}
          setView={props.setView}
        />
      </div>
      <div className="line-thick"></div>
      <div className="my-3">
        <PaymentSummary
          vehicles={vehicles}
          select={select}
          estimate={estimate}
          estimateWeight={estimateWeight}
        />
      </div>
    </>
  );
}

export default SelectRide;
