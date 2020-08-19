import React, { useState, useEffect } from 'react';
import MapContainer from './map-container';
import RideDetail from './ride-detail';

function Main() {
  const [coordinates, setCoordinates] = useState();

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
      />
      <MapContainer
        coordinates={coordinates}
      />
    </main>
  );
}

export default Main;
