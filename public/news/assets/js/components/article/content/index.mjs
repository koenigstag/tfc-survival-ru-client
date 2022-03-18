export default function ArticleContent(props) {
  return `
    <section>
      ${props.text.replaceAll('\n', '<br/>')}
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          max-width: 100%;
          overflow-x: auto;
          text-align: center;
        "
      >
        ${props.attachments?.map((att) => {
          let tag;
          if (att.type === 'photo') {
            tag = `
            <img
              style="
                display: block;
                margin: 2px;
                max-width: ${props.attachments.length > 1 ? window.innerWidth < 500 ? "20%" : "48%" : "70%"};
              "
              src="${att.photo.sizes[att.photo.sizes.length - 1].url}"
              alt="${att.photo.text}"
            />
            `;
          }
          if (att.type === 'video') {
            tag = `
            <div style="display: flex; flex-direction: column; align-items: center;" >
              <div style="display: flex; margin-bottom: 10px;" >
                <a
                  style="display: flex; position: relative;"
                  target="_blank"
                  rel="noreferrer"
                  href="${`https://vk.com/tfcsurvivalru?z=video${props.attachments[0].video.owner_id}_${props.attachments[0].video.id}`}"
                >
                  <img
                    style="
                      display: block;
                      width: 90%;
                      margin: 0 auto;
                    "
                    src="${
                      props.attachments[0].video.image[
                        props.attachments[0].video.image.length - 1
                      ].url
                    }"
                    alt="${props.attachments[0].video.title}"
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
                style="text-align: center;"
                target="_blank"
                rel="noreferrer"
                href="${`https://vk.com/tfcsurvivalru?z=video-${props.attachments[0].video.owner_id}_${props.attachments[0].video.id}`}"
              >
                ${props.attachments[0].video.title}
              </a>
            </div>`;
          }

          return tag;
        }).join('')}
      </div>
    </section>
  `;
}