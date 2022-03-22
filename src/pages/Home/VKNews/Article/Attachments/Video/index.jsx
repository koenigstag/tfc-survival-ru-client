import React from "react";

const AttachVideo = ({ post }) => {
  return (
    <div>
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
          <img style={{ width: "50px" }} src="/play-button.png" alt="play" />
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
  );
};

export default AttachVideo;
