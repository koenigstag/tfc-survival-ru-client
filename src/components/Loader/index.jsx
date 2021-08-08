import React from 'react';

const Loader = () => {
  // for (let i = 0; i < 1000; i++) {
  //   console.log(i);
  // }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
      }}
    >
      Loading...
    </div>
  );
};

export default Loader;
