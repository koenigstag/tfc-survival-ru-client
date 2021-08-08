import React from 'react';
import { mapURL } from '@/api/';

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
      src={mapURL}
    ></iframe>
  );
};

export default MapPage;
