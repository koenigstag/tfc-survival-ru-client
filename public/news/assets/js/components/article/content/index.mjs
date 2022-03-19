import ArticleImage from "../image/index.mjs";
import ArticleVideo from "../video/index.mjs";

export default function ArticleContent(props) {
  const { post } = props;
  return `
    <section>
      ${post.text.replaceAll('\n', '<br/>')}
      <div
        style="
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          max-width: 100%;
          overflow-x: auto;
          text-align: center;
        "
      >
        ${!post.attachments ? '' : post.attachments.map((att, index) => {
          if (att.type === 'photo') {
            return ArticleImage({ post, index, att });
          }
          if (att.type === 'video') {
            return ArticleVideo({ post, att });
          }

          return '';
        }).join('')}
      </div>
    </section>
  `;
}