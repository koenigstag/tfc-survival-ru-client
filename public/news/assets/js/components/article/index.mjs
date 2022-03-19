import ArticleContent from './content/index.mjs';
import ArticleHead from './header/index.mjs';

export default function Article(props) {
  return `
    <article
      id="article-${props.index}"
      style="
        margin-top: 10px;
        padding: 10px 20px 20px;
        border-bottom: 3px solid rgba(120, 120, 120, 0.2);
        font-family: sans-serif;
      "
    >
      ${ArticleHead(props)}
      ${ArticleContent(props)}
    </article>
  `
}