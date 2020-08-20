import React from 'react';

function TripDetail(props) {
  const { pickupValue, dropoffValue } = props;
  const pickupAddress = pickupValue.split(',')[0];
  const pickupCity = pickupValue.split(',')[1];
  const pickupState = pickupValue.split(',')[2];
  const pickupZipcode = pickupValue.split(',')[3];
  const dropoffAddress = dropoffValue.split(',')[0];
  const dropoffCity = dropoffValue.split(',')[1];
  const dropoffState = dropoffValue.split(',')[2];
  const dropoffZipcode = dropoffValue.split(',')[3];
  return (
    <>
      <div className="row">
        <p className="text-white h6 ml-3 mb-0">Trip details</p>
      </div>
      <div className="row my-1">
        <div className="my-auto w-20p text-center">
          <span className="purple font-12px">
            <i className="fas fa-dot-circle"></i>
          </span>
        </div>
        <div className="my-auto w-60p">
          <p className="text-white mb-0 font-12px">{pickupAddress}</p>
          <p className="text-gray mb-0 font-12px">{`${pickupCity} ${pickupState} ${pickupZipcode}`}</p>
        </div>
        <div className="my-auto text-white w-20p font-12px">
          {'pickup'}
        </div>
      </div>
      <div className="row my-1">
        <div className="my-auto w-20p text-center">
          <span className="pink font-12px">
            <i className="fas fa-dot-circle"></i>
          </span>
        </div>
        <div className="my-auto w-60p">
          <p className="text-white mb-0 font-12px">{dropoffAddress}</p>
          <p className="text-gray mb-0 font-12px">{`${dropoffCity} ${dropoffState} ${dropoffZipcode}`}</p>
        </div>
        <div className="my-auto text-white w-20p font-12px">
          {'dropoff'}
        </div>
      </div>
    </>
  );
}

export default TripDetail;
