import ArticleContent from './content/index.mjs';
import ArticleHead from './header/index.mjs';

export default function Article(props) {
  return `
    <article
      id="article-${props.index}"
      style="
        margin-top: 10px;
        padding: 10px 20px 20px;
        border-bottom: 5px solid #f0f0f0;
        font-family: sans-serif;
      "
    >
      ${ArticleHead(props)}
      ${ArticleContent(props)}
    </article>
  `
}