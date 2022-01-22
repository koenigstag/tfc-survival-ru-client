import React, { useEffect, useState } from "react";
import { getMapHtml } from 'api/commonAPI';
import blank_map from "./media/images/blank_map.png";
import constants from '../../../constants';

const MapPage = () => {
  /* const [htmlMap, setHtmlMap] = useState('');

  useEffect(() => {
    const getMap = async () => {
      const html = await getMapHtml();
      setHtmlMap(html);
    }
    getMap();
  }, []); */

  return (
    <div
      style={{
        background: `url(${blank_map}) no-repeat`,
        backgroundSize: "100% 100%",
        // backgroundPosition: 'center',
        position: "absolute",
        top: "1rem",
        left: "1rem",
        bottom: "1rem",
        right: "1rem",
        zIndex: 1,

        margin: "auto",
      }}
    >
      {/* <div style={{ width: '300px', height: '300px' }} dangerouslySetInnerHTML={{ __html: htmlMap }}></div> */}
      <iframe
        style={{
          position: "absolute",
          top: "0",
          left: 0,
          bottom: "0",
          right: 0,
          zIndex: 2,

          margin: "auto",
          width: "85%",
          height: "80%",
        }}
        title="Tfc-survival map"
        // src={constants.MAP_URL}
        src='/map.html'
      >
        Something went wrong...
      </iframe>
    </div>
  );
};

export default MapPage;
