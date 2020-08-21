import React from 'react';

function BottomBtn(props) {
  const { view, setView, reqBtnDisabled, requestedRider, isRequesting, startOver, requestRideBtn } = props;
  return (
    <>
      <div className="ride-btn-box text-center position-absolute fixed-bottom">
        <hr className="line"></hr>
        {view === 'set-destination'
          ? (
            <button
              disabled={!(reqBtnDisabled)}
              onClick={() => setView('select-ride')}
              className={`ride-detail-btn text-bolder ${reqBtnDisabled ? 'bg-purple' : 'bg-purple-disabled'}`}>ride detail</button>
          )
          : requestedRider
            ? <button
              disabled={isRequesting}
              onClick={() => startOver()}
              className={`ride-detail-btn bg-purple text-bolder ${isRequesting ? 'bg-pink-btn-disabled' : 'bg-pink-btn'}`}>{'start over'}</button>
            : <button
              onClick={() => requestRideBtn()}
              className="ride-detail-btn bg-purple text-bolder bg-purple-btn">request ride</button>
        }
      </div>
    </>
  );
}

export default BottomBtn;
