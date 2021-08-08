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
        zIndex: 1,

        margin: 'auto',
        width: '95%',
        height: 'calc(100% - 0.75rem)',
      }}
      title='Tfc-survival map'
      src={mapURL}
    ></iframe>
  );
};

export default MapPage;
