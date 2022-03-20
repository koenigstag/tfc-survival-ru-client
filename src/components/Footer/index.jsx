import { useTheme } from "context";
import React, { useCallback, useState } from "react";
import Copyright from "./Copyright";
import styles from "./Footer.module.sass";

const Footer = () => {
  console.log("test");
  const [discordBlock, setDiscordBlock] = useState(false);
  const handleDiscordShow = useCallback(() => {
    setDiscordBlock((s) => !s);
  }, []);

  const [theme, toggleTheme] = useTheme();

  return (
    <footer id="main-footer" className={styles.footer}>
      <Copyright />
      <button
        class="theme-button"
        style={{
          marginLeft: "20px",
          position: "relative",
          textAlign: "left",
          width: "50px",
          height: "28px",
          outline: "none",
        }}
        onClick={toggleTheme}
      >
        <svg
          style={{
            display: "flex",
            position: "relative",
            zIndex: 2,
            alignItems: "center",
            transition: "margin 0.2s ease",
            marginLeft: theme === "light" ? "50%" : "",
          }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          {theme === "light" ? (
            <path
              fill="white"
              d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
            />
          ) : (
            <path
              fill="#171e25"
              d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z"
            />
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            transition: "margin 0.2s ease",
            borderRadius: "50%",
            width: "25px",
            height: "25px",
            top: 0,
            left: "7%",
            marginLeft: theme === "light" ? "38%" : "",
            backgroundColor: theme === "light" ? "#171e25" : "#999999",
          }}
        ></div>
      </button>
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          right: "85px",
          zIndex: 2,
        }}
      >
        <a href="https://vk.com/tfcsurvivalru" target="_blank" rel="noreferrer">
          <img
            className={styles.homeVKButton}
            src="/vk-button.png"
            alt="vkontakte logo"
          />
        </a>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          right: "25px",
          zIndex: 2,
        }}
      >
        <img
          onClick={handleDiscordShow}
          className={styles.homeDiscordButton}
          src="/dis-comb.png"
          alt="discord logo"
        />
      </div>
      <div
        style={{
          position: "fixed",
          right: "5px",
          bottom: "5px",
          zIndex: 3,
          transform: discordBlock ? "translateX(0%)" : "translateX(105%)",
          transition: "transform 0.6s ease-in-out",
        }}
      >
        <div
          style={{
            backgroundColor: "#202225",
            color: "white",
            margin: "0 auto",
            borderRadius: "10px 10px 0 0",
            position: "relative",
            bottom: "-5px",
            zIndex: 2,
            paddingRight: "10px",
            textAlign: "right",
            cursor: "pointer",
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
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
