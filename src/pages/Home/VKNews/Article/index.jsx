import React from "react";
import Attachments from "./Attachments";

const Article = (props) => {
  const { post } = props;

  return (
    <article
      key={post.id + Math.random() * 100}
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
          <a
            href={`https://vk.com/tfcsurvivalru?w=wall${post.owner_id}_${post.id}`}
            target="_blank"
            rel="noreferrer"
          >
            TFC-survival.ru
          </a>
          <span style={{ marginTop: "3px" }}>
            {new Date(post.date * 1000).toLocaleString()}
          </span>
        </div>
      </header>
      <div>
        {post.text.split("\n").map((t, i) => {
          // const links = /((https?:\/\/)?[^\s.]+\.[\w][^\s]+)/.exec(t);
          // console.log(links);
          return (
            <span key={`${i} ${Math.random() * 1000}`}>
              {t}
              {t && <br />}
            </span>
          );
        })}
      </div>
      {post.attachments?.length && <Attachments post={post} />}
    </article>
  );
};

export default Article;
