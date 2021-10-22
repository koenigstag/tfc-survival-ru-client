import React, { useEffect, useState } from 'react';
import { baseURL } from 'api';

const Skin3DPreview = ({ fileSrc, imageStyles }) => {
  const [show, setShow] = useState(false);

  const calcImage = () =>
    fileSrc === null ? (
      <img
        style={imageStyles}
        src={`${baseURL}/static/skins/steve.png`}
        alt='Default skin'
      />
    ) : (
      <img
        style={imageStyles}
        src={fileSrc + '?time=' + new Date().getTime()}
        alt='User skin'
      />
    );

  const [image, setImage] = useState(calcImage());

  useEffect(() => {
    const ID = setInterval(() => {
      setImage(calcImage());
    }, 2000);
    return () => {
      clearInterval(ID);
    };
  });

  let renderSrc;
  if (fileSrc) {
    const fileURL = new URL(fileSrc);
    const paths = fileURL.pathname.split('/');
    const filename = paths[paths.length - 1];
    renderSrc = `/3drender/index.html?filename=${filename}`;
  }

  return (
    <div>
      {image}
      {/* <iframe
      title='skin 3d render'
      src='https://minerender.org/embed/skin/?skin=asdasd&shadow=true'
      frameborder='10'
    ></iframe> */}

      <div>
        <button
          onClick={() => {
            setShow(s => !s);
          }}
          type='button'
        >
          Показать/Скрыть превью
        </button>

        {show && (
          <div>
            <iframe
              title='skin 3d render'
              style={{
                width: '500px',
                height: '500px',
                // display: show ? 'block' : 'none',
              }}
              src={renderSrc}
              frameBorder='1'
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skin3DPreview;