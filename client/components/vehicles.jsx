import React from 'react';

function Vehicles(props) {
  const { vehicles, select, setSelect, estimate } = props;
  return (
    <>
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
    </>
  );
}

export default Vehicles;
