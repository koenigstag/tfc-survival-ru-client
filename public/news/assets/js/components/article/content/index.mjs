export default function ArticleContent(props) {
  return `
    <section>
      ${props.text.replaceAll('\n', '<br/>')}
      <div>
        ${props.attachments?.map((att) => {
          let tag;
          if (att.type === 'photo') {
            tag = `
            <div style="text-align: center; margin-top: 20px;">
              <img
                style="
                  display: inline-block;
                  ${props.attachments.length === 1 ? 'margin: 0 auto;' : ''}
                  max-width: 80%;
                "
                src="${att.photo.sizes[att.photo.sizes.length - 1].url}"
                alt="${att.photo.text}"
              />
            </div>
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