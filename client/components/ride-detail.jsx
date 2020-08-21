import React, { useState, useEffect } from 'react';
import SetDestination from './set-destination';
import SelectRide from './select-ride';

export default function RideDetail(props) {
  const [pickupValue, setPickupValue] = useState(undefined);
  const [list, setList] = useState({ predictions: [] });
  const [dropoffValue, setDropoffValue] = useState(undefined);
  const [category, setCategory] = useState('pickup');
  const [view, setView] = useState('set-destination');
  const [select, setSelect] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [estimateWeight] = useState([1, 1.25, 1.5, 1.75, 2]);

  useEffect(() => setVehicles([0, 1, 2, 3, 4]), []);

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
            if (props.destination) {
              // props.setMarker(false);
              setView('select-ride');
            }
          } else if (category === 'dropoff') {
            props.setDestination(data.results[0].geometry.location);
            if (props.origin) {
              // props.setMarker(false);
              setView('select-ride');
            }
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

  function clearFields(category) {
    if (category === 'pickup') {
      setPickupValue('');
      props.setOrigin(null);
    } else if (category === 'dropoff') {
      setDropoffValue('');
      props.setDestination(null);
    }
    props.setMarker(false);
    props.setZoom(10);
  }

  let element = null;
  switch (view) {
    case 'select-ride':
      element = (
        <SelectRide
          origin={props.origin}
          destination={props.destination}
          setView={setView}
          select={select}
          setSelect={setSelect}
          vehicles={vehicles}
          setVehicles={setVehicles}
          estimateWeight={estimateWeight}
          pickupValue={pickupValue}
          dropoffValue={pickupValue}
          rider={props.rider}
          setRider={props.setRider}
        />
      );
      break;
    case 'set-destination':
      element = (
        <SetDestination
          origin={props.origin}
          destination={props.destination}
          pickupValue={pickupValue}
          dropoffValue={dropoffValue}
          setCategory={setCategory}
          setValue={setValue}
          setView={setView}
          clearFields={clearFields}
          list={list}
          category={category}
        />
      );
      break;
  }

  return (
    <div className="position-absolute fixed-bottom ride-detail-container ride-dark px-3 pt-3">
      {element}
    </div>
  );
}
