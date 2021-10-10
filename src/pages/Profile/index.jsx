import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slices/userSlice';
import ChangePasswordForm from './ChangePasswordForm';
import LinkDiscordForm from './LinkDiscordForm';
import ConfirmEmailForm from './ConfirmEmailForm';
import UploadFileForm from './UploadFileForm';
import UploadSkinForm from './UploadSkinForm';
import UploadCapeForm from './UploadCapeForm';
import { getCape, setCape, getSkin, setSkin } from 'api/userAPI';
import { baseURL } from 'api';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);

  const imageStyles = {
    marginTop: '10px',
    maxWidth: '300px',
    // border: '1px solid #555',
    // borderRadius: '5px',
    outline: 'thick double #555',
  };

  return (
    <div>
      <div>{JSON.stringify(user.data, null, 4)}</div>
      <ConfirmEmailForm user={user} />
      <ChangePasswordForm user={user} />
      <LinkDiscordForm user={user} />

      <UploadFileForm
        text={{
          legend: 'Загрузка скина',
          description: 'Файл скина в формате png',
          submitBtn: 'Установить',
          imageAlt: 'User skin',
        }}
        sideEffect={() => getSkin({ nickname: user.data.nickname })}
        sideEffectDependency={user.data.nickname}
        submitFunc={file =>
          setSkin({
            nickname: user.data.nickname,
            accessToken: user.data.accessToken,
            file,
          })
        }
        filePreview={fileSrc => {
          let renderSrc;
          if (fileSrc) {
            const fileURL = new URL(fileSrc);
            const paths = fileURL.pathname.split('/');
            const filename = paths[paths.length - 1];
            renderSrc = `/3drender/index.html?filename=${filename}`;
            console.log(renderSrc);
          }

          return (
            <div>
              {fileSrc === null ? (
                <img
                  style={imageStyles}
                  src={`${baseURL}/static/skins/steve.png`}
                  alt='Default skin'
                />
              ) : (
                <img style={imageStyles} src={fileSrc} alt='User skin' />
              )}
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

                <iframe
                  title='skin 3d render'
                  style={{
                    width: '500px',
                    height: '500px',
                    display: show ? 'block' : 'none',
                  }}
                  src={renderSrc}
                  frameBorder='1'
                ></iframe>
              </div>
            </div>
          );
        }}
      />
      <UploadFileForm
        text={{
          legend: 'Загрузка плаща',
          description: 'Файл плаща в формате png',
          submitBtn: 'Установить',
          imageAlt: 'User cape',
        }}
        sideEffect={() => getCape({ nickname: user.data.nickname })}
        sideEffectDependency={user.data.nickname}
        submitFunc={file =>
          setCape({
            nickname: user.data.nickname,
            accessToken: user.data.accessToken,
            file,
          })
        }
        filePreview={fileSrc =>
          fileSrc === null ? (
            'Плащ не установлен'
          ) : (
            <>
              <img style={imageStyles} src={fileSrc} alt='User cape' />
            </>
          )
        }
      />
    </div>
  );
};

export default ProfilePage;
