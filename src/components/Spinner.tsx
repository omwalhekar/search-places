import React from 'react';

const Spinner = () => {
  return (
    <div className='spinner-wrapper'>
      <span>Loading...</span>
      <img src='/assets/spinner.gif' />
    </div>
  );
};

export default Spinner;
