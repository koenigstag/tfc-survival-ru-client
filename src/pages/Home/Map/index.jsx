import React from 'react';
import { mapURL } from 'api/';
import blank_map from './media/images/blank_map.png';

const MapPage = () => {
  return (
    <div
      style={{
        background: `url(${blank_map}) no-repeat`,
        backgroundSize: '100% 100%',
        // backgroundPosition: 'center',
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        bottom: '1rem',
        right: '1rem',
        zIndex: 1,

        margin: 'auto',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: '0',
          left: 0,
          bottom: '0',
          right: 0,
          zIndex: 2,

          margin: 'auto',
          width: '85%',
          height: '80%',
        }}
        title='Tfc-survival map'
        src={mapURL}
      >
        Something went wrong...
      </iframe>
    </div>
  );
};

export default MapPage;
