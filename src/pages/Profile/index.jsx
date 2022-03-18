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

const sum = (...nums) => nums.reduce((acc, val) => isNaN(val) ? acc : acc + val, 0);

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

  const [nick, setNick] = useState(user.data.nickname);

  const [stats, setStats] = useState(null);

  const getMyStat = async (nick) => {
    const { stats } = await getMyStats(nick);

    const prepared = stats.map((item) => ({
      ...item,
      "stat.playOneMinute": (item["stat.playOneMinute"] / 72000).toFixed(2),
      "stat.totalWalkOneCm": sum(item["stat.sprintOneCm"], item["stat.walkOneCm"], item["stat.crouchOneCm"]),
      "stat.totalSwimOneCm": sum(item["stat.diveOneCm"], item["stat.swimOneCm"], item["stat.boatOneCm"]),
      "stat.totalFlyOneCm": sum(item["stat.fallOneCm"], item["stat.flyOneCm"]),
    }));

    setStats(prepared);
  };

  useEffect(() => {
    getMyStat(user.data.nickname);
  }, [user.data.nickname]);

  if (!user.isAuth) {
    return <Redirect to="/account/login" />;
  }

  return (
    <div>
      <h3>
        Личный кабинет. Ник: {user.data.nickname}{" "}
        <img
          src={`/dynmap-web/tiles/faces/32x32/${nick}.png`}
          onError={({ target }) => {
            target.onerror = null;
            setNick("steve");
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
            fileSrc ? (
              <center>
                <img style={imageStyles} src={fileSrc} alt="User cape" />
              </center>
            ) : (
              "Плащ не установлен"
            )
          }
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h5>Личная статистика</h5>
        <Table
          className={styles.table}
          headers={["Выходов", "Смертей", "Убито мобов", "Убито игроков", "Прыжков", "Пройдено блоков", "Проплыто", "На лошади", "Часов"]}
          list={stats || [{}]}
          defaultValue={0}
          paths={[
            "stat.leaveGame",
            "stat.deaths",
            "stat.mobKills",
            "stat.playerKills",
            "stat.jump",
            "stat.totalWalkOneCm",
            "stat.totalSwimOneCm",
            "stat.horseOneCm",
            "stat.playOneMinute",
          ]}
          itemKey={"nickname"}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
