export default function ArticleVideo(props) {
  const { post } = props;

  return `
  <div style="display: flex; flex-direction: column; align-items: center;" >
    <div style="display: flex; margin-bottom: 10px;" >
      <a
        style="display: flex; position: relative;"
        target="_blank"
        rel="noreferrer"
        href="${`${window.VK_LINK}/${window.VK_GROUP_ID}?z=video${post.attachments[0].video.owner_id}_${post.attachments[0].video.id}`}"
        title="Ссылка на видео VK.com"
      >
        <img
          style="
            display: block;
          "
          src="${
            post.attachments[0].video.image[
              post.attachments[0].video.image.length - 1
            ].url
          }"
          alt="${post.attachments[0].video.title}"
        />
        <img
          style="
            position: absolute;
            align-self: center;
            left: calc(50% - 25px);
            width: 50px;
          "
          src="./assets/img/play-button.png"
          alt="play"
        />
      </a>
    </div>
    <a
      style="
        width: 100%;
        text-align: left;
      "
      target="_blank"
      rel="noreferrer"
      href="${`${window.VK_LINK}/${window.VK_GROUP_ID}?z=video-${post.attachments[0].video.owner_id}_${post.attachments[0].video.id}`}"
    >
      <b>${post.attachments[0].video.title}</b>
    </a>
  </div>`;
}