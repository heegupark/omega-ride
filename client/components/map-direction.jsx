/* global google */
import React, { useState, useEffect } from 'react';
import { DirectionsRenderer } from 'react-google-maps';

function MapDirection(props) {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { places, travelMode } = props;

    const waypoints = places.map(p => ({
      location: { lat: p.lat, lng: p.lng },
      stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();
    // const directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: 'rgb(234,57,186)' } });
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    directions && (
      <DirectionsRenderer
        directions={directions}
        options={{
          polylineOptions: {
            strokeOpacity: 0.7,
            strokeWeight: 7,
            strokeColor: '#ea39ba'
          }
        }}
      />
    )
  );
}

export default MapDirection;
