import React from 'react';
import Vehicles from './vehicles';

function RiderSelected(props) {
  const { select, setSelect, estimate, estimateWeight } = props;
  return (
    <>
      <div className="my-1">
        <h4 className="text-white text-bolder">Your rider</h4>
        <p className="font-12px text-danger mb-0">* This is not real ride.</p>
        <p className="font-12px text-gray mb-0">No one is coming to the origin or destination address.</p>
      </div>
      <div className="rider-image text-center mt-5">
        <h5 className="text-white text-center my-3">{'Henry'}</h5>
        <img className="my-2" src="images/omegathrone_profile.jpg" alt="your rider"/>
        <h6 className="text-white text-center my-3">{'rate: 4.7'}</h6>
        <div className="my-2"></div>
        <p className="text-white text-center my-3">{`arriving in ${props.approachEstimate} minutes`}</p>
      </div>
      <Vehicles
        vehicles={[select]}
        select={select}
        setSelect={setSelect}
        estimate={estimate}
        estimateWeight={estimateWeight}
      />
    </>
  );
}

export default RiderSelected;
