import React, { useState, useEffect } from 'react';
import Vehicles from './vehicles';
import TripDetail from './trip-detail';
import PaymentSummary from './payment-summary';

function RequestRide(props) {
  // const [distance, setDistance] = useState([]);
  const [select, setSelect] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => setVehicles([0, 1, 2, 3, 4]), []);
  const estimate = 10;
  return (
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
        />
      </div>
      <div className="row line-thick"></div>
      <div className="my-3">
        <TripDetail
          pickupValue={props.pickupValue}
          dropoffValue={props.pickupValue}
        />
      </div>
      <div className="row line-thick"></div>
      <div className="my-3">
        <PaymentSummary
          estimate={estimate}
        />
      </div>
      <div className="ride-btn-box text-center position-absolute">
        <hr className="line"></hr>
        <button className="ride-detail-btn bg-purple text-bolder bg-purple-btn">request ride</button>
      </div>
    </>
  );
}

export default RequestRide;
