import React from 'react';

function PaymentSummary(props) {
  const { select, estimate, estimateWeight } = props;
  const totalEstimate = Math.floor(estimate * estimateWeight[select]);
  return (
    <>
      <div className="row">
        <p className="text-white h6 ml-3 mb-0">Payment</p>
      </div>
      <div className="row mt-2">
        <span className="col text-center text-white h5 mb-0">Total</span>
        <span className="col text-center text-white mb-0">{`$${totalEstimate - 1} - ${totalEstimate + 1}`}</span>
      </div>
    </>
  );
}

export default PaymentSummary;
