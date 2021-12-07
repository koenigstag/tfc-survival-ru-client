import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slices/userSlice';
import ChangePasswordForm from './ChangePasswordForm';
import LinkDiscordForm from './LinkDiscordForm';
import ConfirmEmailForm from './ConfirmEmailForm';
import UploadFileForm from './UploadFileForm';
import Skin3DPreview from './Skin3DPreview';
import { getCape, setCape, getSkin, setSkin } from 'api/userAPI';
import { Redirect } from 'react-router';

const imageStyles = {
  marginTop: '10px',
  maxWidth: '300px',
  // border: '1px solid #555',
  // borderRadius: '5px',
  outline: 'thick double #555',
};

const ProfilePage = () => {
  const user = useSelector(selectUser);

  if(!user.isAuth) {
    return <Redirect to="/account/login" />
  }

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
        filePreview={fileSrc => (
          <Skin3DPreview fileSrc={fileSrc} imageStyles={imageStyles} />
        )}
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
