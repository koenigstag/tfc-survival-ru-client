import React, { useCallback, useEffect, useState } from "react";
import ButtonLink from "components/ETC/ButtonLink";
import { useSelector } from "react-redux";
import { selectUser } from "app/slices/userSlice";
import { getVKNews } from "api/commonAPI";
import styles from "./HomePage.module.sass";

const HomePage = () => {
  const user = useSelector(selectUser);
  const [discordBlock, setDiscordBlock] = useState(false);
  const handleDiscordShow = useCallback(() => {
    setDiscordBlock((s) => !s);
  }, []);

  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const news = await getVKNews();
      setNews(news);
    };
    getNews();
  }, []);

  return (
    <div className={styles.homePage}>
      <h3>
        Добро пожаловать на TFC-survival,{" "}
        {user.isAuth ? user.data.nickname : "дружок"}
      </h3>
      <div className={styles.homePageButtons}>
        <ButtonLink
          text="Наш дискорд сервер"
          // href="https://discord.gg/xaFCzGarws"
          onClick={handleDiscordShow}
          title="Discord сообщество проекта"
        />
        <ButtonLink
          text="Скачать лаунчер"
          link="/home/launcher"
          title="Скачать лаунчер для игры на сервере"
          variant="blue"
        />
      </div>
      <h5>Мы есть на мониторингах, голосуйте за нас</h5>
      <div>
        <ButtonLink
          text="minecraftratig.ru"
          href="https://minecraftrating.ru/vote/114193/"
          title="Проголосовать"
        />
        <ButtonLink
          text="monitoringminecraft.ru"
          href="https://monitoringminecraft.ru/top/tfc-survival"
          title="Проголосовать"
        />
      </div>
      <div
        style={{
          display: discordBlock ? "block" : "none",
          position: "fixed",
          right: "5px",
          bottom: "5px",
          zIndex: 3,
        }}
      >
        <div
          style={{
            backgroundColor: "#202225",
            color: "white",
            margin: "0 auto",
            borderRadius: '10px 10px 0 0',
            position: 'relative',
            bottom: '-5px',
            zIndex: 2,
            paddingRight: '10px',
            textAlign: 'right'
          }}
          onClick={handleDiscordShow}
        >
          X
        </div>
        <iframe
          title="discord-widget"
          src="https://discord.com/widget?id=253218452209270784&amp;theme=dark"
          width="280"
          height="400"
          allowtransparency="true"
          frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>

      <section
        id="vk-news"
        style={{
          // border: "1px solid blue",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "5px",
          padding: "20px",
          maxWidth: "100%",
          minHeight: "45vmin",
          margin: "50px auto 0 auto",
          textAlign: "left",
        }}
      >
        {news.length === 0 ? (
          <center>
            Тут должны были быть новости из VK.com но Крампус их украл 😥
          </center>
        ) : (
          news.map((post) => (
            <article
              key={post.id}
              style={{
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "2px solid blue",
              }}
            >
              <header style={{ display: "flex", marginBottom: "20px" }}>
                <a
                  style={{ width: "50px", height: "50px", marginRight: "15px" }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://vk.com/tfcsurvivalru"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      verticalAlign: "top",
                    }}
                    // src="https://sun6-20.userapi.com/s/v1/ig2/o0ZCxo53d34cU8toliWWxF8xOplmsu0Db1SmpkWXbeTeNBC0wQVorxVNxNzp0BQfFdpXhztDE3Kf8fajmE0RNFdI.jpg?size=50x50&quality=96&crop=0,0,415,415&ava=1"
                    src="/logo_small.png"
                    alt="vk-logo"
                  />
                </a>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <a href="https://vk.com/tfcsurvivalru">TFC-survival.ru</a>
                  <span style={{ marginTop: "3px" }}>
                    {new Date(post.date * 1000).toLocaleString()}
                  </span>
                </div>
              </header>
              <div>
                {post.text.split("\n").map((t, i) => {
                  const links = /((https?:\/\/)?[^\s.]+\.[\w][^\s]+)/.exec(t);

                  // console.log(links);

                  return (
                    <span key={i}>
                      {t}
                      {t && <br />}
                    </span>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  maxWidth: "100%",
                  overflowX: "auto",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {post.attachments.length ? (
                  post.attachments[0].type === "photo" ? (
                    post.attachments.map((a) => (
                      <img
                        key={a.id}
                        style={{
                          display: "block",
                          maxWidth: post.attachments.length > 1 ? "20%" : "70%",
                        }}
                        src={a.photo.sizes[a.photo.sizes.length - 1].url}
                        alt={a.photo.text}
                      />
                    ))
                  ) : post.attachments[0].type === "video" ? (
                    <div>
                      {/* <video src={post.attachments[0].video.url}></video> */}
                      <div style={{ display: "flex", position: "relative" }}>
                        <img
                          style={{
                            display: "block",
                            width: "90%",
                            margin: "0 auto",
                          }}
                          src={
                            post.attachments[0].video.image[
                              post.attachments[0].video.image.length - 1
                            ].url
                          }
                          alt={post.attachments[0].video.title}
                        />
                        <a
                          style={{
                            position: "absolute",
                            alignSelf: "center",
                            left: "calc(50% - 25px)",
                          }}
                          target="_blank"
                          rel="noreferrer"
                          href={`https://vk.com/tfcsurvivalru?z=video${post.attachments[0].video.owner_id}_${post.attachments[0].video.id}`}
                        >
                          <img
                            style={{ width: "50px" }}
                            src="/play-button.png"
                            alt="play"
                          />
                        </a>
                      </div>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://vk.com/tfcsurvivalru?z=video-${post.attachments[0].video.owner_id}_${post.attachments[0].video.id}`}
                      >
                        {" "}
                        {post.attachments[0].video.title}
                      </a>
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default HomePage;
