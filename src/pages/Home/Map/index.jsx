import React from 'react';

const MapPage = () => {
  return (
    <iframe
      style={{
        position: 'absolute',
        top: '-1.5rem',
        left: 0,
        bottom: '0',
        right: 0,
        width: '95%',
        margin: 'auto',
        height: 'calc(100% + 1.5rem)',
        zIndex: 1,
      }}
      title='Tfc-survival map'
      src='http://tfc-survival.ru:8154/'
      // width='100%'
      // height='100%'
    ></iframe>
  );
};

export default MapPage;
