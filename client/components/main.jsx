import React, { Component } from 'react';
import Map from './map';
import RideDetail from './ride-detail';

class Main extends Component {
  render() {

    return (
      <main>
        <RideDetail />
        <Map />
      </main>
    );
  }
}

export default Main;
