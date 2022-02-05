import React, { useCallback, useState } from 'react';
import Copyright from './Copyright';
import styles from './Footer.module.sass';

const Footer = () => {
  const [discordBlock, setDiscordBlock] = useState(false);
  const handleDiscordShow = useCallback(() => {
    setDiscordBlock((s) => !s);
  }, []);

  return (
    <footer className={styles.footer}>
      <Copyright />
      <div style={{ position: "absolute", bottom: "0px", right: "25px", zIndex: 2 }}>
        <img onClick={handleDiscordShow} className={styles.homeDiscordButton} src="/dis-comb.png" alt="discord logo" />
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
          frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
