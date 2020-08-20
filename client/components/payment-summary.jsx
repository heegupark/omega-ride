import React from 'react';

function PaymentSummary(props) {
  return (
    <>
      <div className="row">
        <p className="text-white h6 ml-2 mb-0">Trip details</p>
      </div>
      <div className="row mt-2">
        <span className="col text-center text-white h5 mb-0">Total</span>
        <span className="col text-center text-white mb-0">{`$${props.estimate - 1} - ${props.estimate + 1}`}</span>
      </div>
    </>
  );
}

export default PaymentSummary;
