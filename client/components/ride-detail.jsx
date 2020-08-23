import React, { useRef, useState, useEffect } from 'react';
import SetDestination from './set-destination';
import SelectRide from './select-ride';
import BottomBtn from './bottom-btn';
import { useSpring, a, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export default function RideDetail(props) {
  const [pickupValue, setPickupValue] = useState(undefined);
  const [list, setList] = useState({ predictions: [] });
  const [dropoffValue, setDropoffValue] = useState(undefined);
  const [category, setCategory] = useState('pickup');
  const [view, setView] = useState('set-destination');
  const [select, setSelect] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [estimateWeight] = useState([1, 1.25, 1.5, 1.75, 2]);
  const [requestedRider, setRequestedRider] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [tripDistance, setTripDistance] = useState(null);
  const [riderDistance, setRiderDistance] = useState(null);
  const elementRef = React.createRef();

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

  function getDistance(category, origin, destination) {
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
    props.setRider(null);
    setView('set-destination');
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
          tripDistance={tripDistance}
          riderDistance={riderDistance}
          getDistance={getDistance}
          estimateWeight={estimateWeight}
          pickupValue={pickupValue}
          dropoffValue={pickupValue}
          rider={props.rider}
          setRider={props.setRider}
          requestedRider={requestedRider}
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

  const height = window.innerHeight * 0.6;
  const draggingRef = useRef(true);
  const [{ y }, set] = useSpring(() => ({ y: height }));
  const myPos = 0;

  const open = ({ canceled }) => {
    set({ y: myPos, config: canceled ? config.wobbly : config.stiff });
  };
  const close = (velocity = 0) => {
    set({ y: height, config: { ...config.stiff, velocity } });
  };

  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (first) draggingRef.current = false;
      else if (last) setTimeout(() => (draggingRef.current = false), 0);
      if (last) my > height * 0.5 || vy > 0.5 ? open(vy) : close(vy);
      else set({ y: my, immediate: false, config: config.stiff });
    },
    { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 10 }, rubberband: true }
  );
  const display = y.to(py => (py < height ? 'block' : 'block'));
  open(true);
  const reqBtnDisabled = props.origin && props.destination;
  return (
    <>
      <a.div
        ref={elementRef}
        {...bind()}
        style={{ display, bottom: `calc(100vh + ${height - 100}px)`, y }}
        className={'position-absolute ride-dark ride-detail-container z-index-1 px-3 pt-2'}>
        <div
          onClick={() => !draggingRef.current && close()}
          className="drag-handle mx-auto">
        </div>
        <div
          className="position-absolute ride-detail-content z-index-1">
          {element}
          <div className="margin-4-btn"></div>
        </div>
      </a.div>
      <BottomBtn
        view={view}
        setView={setView}
        reqBtnDisabled={reqBtnDisabled}
        requestedRider={requestedRider}
        isRequesting={isRequesting}
        startOver={startOver}
        requestRideBtn={requestRideBtn}
      />
    </>
  );
}
