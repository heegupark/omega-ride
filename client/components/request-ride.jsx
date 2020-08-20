import React, { useState, useEffect } from 'react';

function RequestRide(props) {
  // const [distance, setDistance] = useState([]);
  const [select, setSelect] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => setVehicles([0, 1, 2, 3, 4]), []);
  const estimate = 10;
  return (
    <>
      <div className="my-1">
        <h4 className="text-white text-bolder">Fare estimate</h4>
        <span className="font-14px text-gray">Sample fares are estimates only and do not reflect variations due to discounts, traffic delays or other factors.</span>
        <span className="font-14px text-danger">* This is not real estimates.</span>
      </div>
      <div className="my-3">
        {vehicles.map(vehicle => {
          let imgUrl = '/images/ride.png';
          let rideDesc = 'ride';
          switch (vehicle) {
            case 1:
              imgUrl = '/images/ride-xl.png';
              rideDesc = 'ride XL';
              break;
            case 2:
              imgUrl = '/images/lux.png';
              rideDesc = 'lux';
              break;
            case 3:
              imgUrl = '/images/lux-black.png';
              rideDesc = 'lux black';
              break;
            case 4:
              imgUrl = '/images/lux-black-xl.png';
              rideDesc = 'lux black XL';
              break;
            default:
              imgUrl = '/images/ride.png';
              rideDesc = 'ride';
          }
          return (
            <div
              key={vehicle}
              onClick={() => setSelect(vehicle)}
              className={`${select === vehicle ? 'border-2px-purple' : 'border-2px-gray'} mx-auto ride-box row cursor my-2`}>
              <div className="ride-img-box my-auto">
                <img src={imgUrl} alt="ride" />
              </div>
              <div className="ride-detail-box my-auto">
                <p className="h5 text-white mb-0">{rideDesc}</p>
                <p className="font-14px text-gray mb-0">{'4 seats'}</p>
              </div>
              <div className="my-auto text-white ride-estimate-box">
                {`$${estimate - 1} - ${estimate + 1}`}
              </div>
            </div>
          );
        }
        )
        }
      </div>
    </>
  );
}

export default RequestRide;
