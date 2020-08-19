import React, { Component } from 'react';
import MapContainer from './map-container';
import RideDetail from './ride-detail';

class Main extends Component {
  render() {

    return (
      <main>
        <RideDetail />
        <MapContainer />
      </main>
    );
  }
}

export default Main;
