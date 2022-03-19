import Article from "../article/index.mjs";

export const articles = [];

export default function NewsFeed(props) {

  return `
    ${props.news.map((post, index, news) => Article({ news, index, post })).join('')}
  `;
}
