import React, { useState, useEffect } from 'react';
import MapContainer from './map-container';
import RideDetail from './ride-detail';
import Disclaimer from './disclaimer';

function Main() {
  const [coordinates, setCoordinates] = useState();
  const [zoom, setZoom] = useState(10);
  const [marker, setMarker] = useState(false);
  const [origin, setOrigin] = useState();
  const [rider, setRider] = useState();
  const [destination, setDestination] = useState();
  const [isAcceptDisclaimer, setIsAcceptDisclaimer] = useState(localStorage.getItem('omegarideaccept', true));

  function getCoordinates() {
    fetch('https://geoip-db.com/json/')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Something went wrong!');
        }
      })
      .then(data => {
        setCoordinates({ lat: data.latitude, lng: data.longitude });
      })
      .catch(error => console.error(error.message));
  }

  useEffect(() => getCoordinates(), []);

  return (
    <main>
      <RideDetail
        setCoordinates={setCoordinates}
        setZoom={setZoom}
        setMarker={setMarker}
        origin={origin}
        destination={destination}
        setOrigin={setOrigin}
        setDestination={setDestination}
        rider={rider}
        setRider={setRider}
      />
      <MapContainer
        zoom={zoom}
        marker={marker}
        origin={origin}
        rider={rider}
        destination={destination}
        coordinates={coordinates}
      />
      {!isAcceptDisclaimer &&
      <Disclaimer
        setIsAcceptDisclaimer={setIsAcceptDisclaimer}
      />
      }
    </main>
  );
}

export default Main;
