import React, { useState, useEffect } from 'react';
import Vehicles from './vehicles';
import TripDetail from './trip-detail';
import PaymentSummary from './payment-summary';

function RequestRide(props) {
  const [distance, setDistance] = useState(null);
  const [select, setSelect] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [estimateWeight] = useState([1, 1.25, 1.5, 1.75, 2]);
  useEffect(() => setVehicles([0, 1, 2, 3, 4]), []);

  function getDistance() {
    const { origin, destination } = props;
    fetch('/api/distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination })
    }
    ).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong!');
      }
    })
      .then(data => {
        setDistance(data.distance);
      })
      .catch(error => console.error(error.message));
  }
  useEffect(() => getDistance(), []);

  const estimate = distance ? Number(distance.split(' ')[0]) * 2 : 10;
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
          estimateWeight={estimateWeight}
        />
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
        <button className="ride-detail-btn bg-purple text-bolder bg-purple-btn">request ride</button>
      </div>
    </>
  );
}

export default RequestRide;
