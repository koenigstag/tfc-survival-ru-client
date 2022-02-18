import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "app/slices/userSlice";
import ChangePasswordForm from "./ChangePasswordForm";
import LinkDiscordForm from "./LinkDiscordForm";
import UploadFileForm from "./UploadFileForm";
import Skin3DPreview from "./Skin3DPreview";
import { getCape, setCape, getSkin, setSkin, getMyStats } from "api/userAPI";
import styles from "./ProfilePage.module.sass";
import Table from "components/ETC/Table";

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
  
  const [stats, setStats] = useState(null);

  const getMyStat = async (nick) => {
    const { stats } = await getMyStats(nick);
    console.log(stats);

    const prepared = stats.map((item) => ({
      ...item,
      "stat.playOneMinute": (item["stat.playOneMinute"] / 72000).toFixed(2),
    }));

    setStats(prepared);
  }

  useEffect(() => {
    getMyStat(user.data.nickname);
  }, [user.nickname]);

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
      <div style={{ marginTop: '40px' }}>
        <h5>Личная статистика</h5>
        <Table
            className={styles.table}
            headers={["Смертей", "Выходов", "Прыжков", "Часов"]}
            list={stats || [{}]}
            paths={[
              "stat.deaths",
              "stat.leaveGame",
              "stat.jump",
              "stat.playOneMinute",
            ]}
            itemKey={"nickname"}
          />
      </div>
    </div>
  );
};

export default ProfilePage;
