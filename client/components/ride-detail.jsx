import React, { useState } from 'react';
import SetDestination from './set-destination';
import RequestRide from './request-ride';

export default function RideDetail(props) {
  const [pickupValue, setPickupValue] = useState(undefined);
  const [list, setList] = useState({ predictions: [] });
  const [dropoffValue, setDropoffValue] = useState(undefined);
  const [category, setCategory] = useState('pickup');
  const [view, setView] = useState('set-destination');

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
          if (category === 'pickup') {
            props.setOrigin(data.results[0].geometry.location);
          } else if (category === 'dropoff') {
            props.setDestination(data.results[0].geometry.location);
            setView('request-ride');
          }
          props.setCoordinates(data.results[0].geometry.location);
        })
        .catch(error => console.error(error.message));
    }
  }

  function setValue(value, category, action) {
    if (action === 'address') {
      getAddress(value);
    } else if (action === 'coordinate') {
      getLatLng(value);
      props.setMarker(true);
      props.setZoom(18);
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
      {view === 'request-ride'
        ? <RequestRide
          origin={props.origin}
          destination={props.destination}
          setView={setView}
          pickupValue={pickupValue}
          dropoffValue={pickupValue}
        />
        : <SetDestination
          origin={props.origin}
          destination={props.destination}
          pickupValue={pickupValue}
          dropoffValue={dropoffValue}
          setCategory={setCategory}
          setValue={setValue}
          setView={setView}
          setPickupValue={setPickupValue}
          setDropoffValue={setDropoffValue}
          list={list}
          category={category}
        />
      }
    </div>
  );
}
