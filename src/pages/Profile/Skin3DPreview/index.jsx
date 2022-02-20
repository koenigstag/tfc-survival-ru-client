import React, { useCallback, useState } from "react";
import { baseURL } from "api";

const Skin3DPreview = ({ fileSrc, imageStyles }) => {
  const [show, setShow] = useState(false);

  const [dimm, setDimm] = useState({});

  const onImgLoad = useCallback(({ target: img }) => {
    setDimm({ height: img.height, width: img.width });
  }, []);

  const calcImage = () => {
    const calcSrc = fileSrc === null ? `${baseURL}/static/skins/steve.png` : fileSrc + "?time=" + new Date().getTime();

    return (
      <img
        onLoad={onImgLoad}
        style={imageStyles}
        src={calcSrc}
        alt="User skin"
      />
    );
  };

  let renderSrc;
  if (fileSrc) {
    const fileURL = new URL(fileSrc);
    const paths = fileURL.pathname.split("/");
    const filename = paths[paths.length - 1];
    renderSrc = `/3drender/index.html?filename=${filename}`;
  } else {
    renderSrc = `/3drender/index.html?filename=steve.png`;
  }

  return (
    <div>
      {calcImage()}
      {/* <iframe
      title='skin 3d render'
      src='https://minerender.org/embed/skin/?skin=asdasd&shadow=true'
      frameBorder='10'
    ></iframe> */}

      <div>
        <button
          onClick={() => {
            setShow((s) => !s);
          }}
          type="button"
        >
          Показать/Скрыть 3D превью
        </button>

        {show && (
          <div style={{ maxWidth: "100%" }}>
            <center>
              <div>{dimm.width > 64 && 'Не работает для скинов больше ширины 64 пикс. В игре все ОК.'}</div>
              <iframe
                title="skin 3d render"
                style={{
                  maxWidth: "300px",
                  height: "500px",
                  overflow: "hidden",
                  // display: show ? 'block' : 'none',
                }}
                src={renderSrc}
                frameBorder="1"
              ></iframe>
            </center>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skin3DPreview;
