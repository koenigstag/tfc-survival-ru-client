import { formatDate } from "../../../utils/date.mjs";
import Logo from "../../logo/index.mjs";

export default function ArticleHead(props) {
  const { post } = props;

  return `
    <header style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="margin-right: 30px;">
        <a
          target="_blank" rel="noreferrer noopener"
          href="${window.VK_LINK}/${window.VK_GROUP_ID}"
          title="Ссылка на группу TFC-survival.ru"
        >${Logo(props)}</a>
      </div>
      <div>
        <div>
          <a
            style="text-decoration: none;"
            target="_blank" rel="noreferrer noopener"
            href="${window.VK_LINK}/${window.VK_GROUP_ID}?w=wall${post.owner_id}_${post.id}"
            title="Ссылка на пост TFC-survival.ru"
          >
              TFC-survival.ru
          </a>
        </div>
        <div style="color: grey; font-size: 0.8em; margin-top: 3px;">
          ${formatDate(post.date)}
        </div>
      </div>
    </header>
  `
}