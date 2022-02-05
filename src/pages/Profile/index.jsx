import React from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "app/slices/userSlice";
import ChangePasswordForm from "./ChangePasswordForm";
import LinkDiscordForm from "./LinkDiscordForm";
import UploadFileForm from "./UploadFileForm";
import Skin3DPreview from "./Skin3DPreview";
import { getCape, setCape, getSkin, setSkin } from "api/userAPI";
import styles from "./ProfilePage.module.sass";

const imageStyles = {
  marginTop: "10px",
  maxWidth: "80%",
  width: "100%",
  // border: '1px solid #555',
  // borderRadius: '5px',
  outline: "thick double #555",
};

const ProfilePage = () => {
  const user = useSelector(selectUser);

  if (!user.isAuth) {
    return <Redirect to="/account/login" />;
  }

  return (
    <div>
      <h3>
        Личный кабинет. Ник: {user.data.nickname}{" "}
        <img
          src={`/dynmap-web/tiles/faces/32x32/${user.data.nickname}.png`}
          onError={({ target }) => {
            target.onerror = null;
            target.src = "/dynmap-web/tiles/faces/32x32/aboba.png";
          }}
          alt="skin face"
        />
      </h3>
      <div className={styles.flexProfile}>
        <div>
          <ChangePasswordForm user={user} />
          <LinkDiscordForm user={user} />
        </div>

        <UploadFileForm
          text={{
            legend: "Загрузка скина",
            description: "Файл скина в формате png",
            submitBtn: "Установить",
            imageAlt: "User skin",
          }}
          sideEffect={() => getSkin({ nickname: user.data.nickname })}
          sideEffectDependency={user.data.nickname}
          submitFunc={(file) =>
            setSkin({
              nickname: user.data.nickname,
              accessToken: user.data.accessToken,
              file,
            })
          }
          filePreview={(fileSrc) => (
            <center>
              <Skin3DPreview fileSrc={fileSrc} imageStyles={imageStyles} />
            </center>
          )}
        />

        <UploadFileForm
          text={{
            legend: "Загрузка плаща",
            description: "Файл плаща в формате png",
            submitBtn: "Установить",
            imageAlt: "User cape",
          }}
          sideEffect={() => getCape({ nickname: user.data.nickname })}
          sideEffectDependency={user.data.nickname}
          submitFunc={(file) =>
            setCape({
              nickname: user.data.nickname,
              accessToken: user.data.accessToken,
              file,
            })
          }
          filePreview={(fileSrc) =>
            fileSrc === null ? (
              "Плащ не установлен"
            ) : (
              <center>
                <img style={imageStyles} src={fileSrc} alt="User cape" />
              </center>
            )
          }
        />
      </div>
    </div>
  );
};

export default ProfilePage;
