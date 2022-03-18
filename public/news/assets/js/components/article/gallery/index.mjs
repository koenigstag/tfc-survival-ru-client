import ArticleImage from "../image/index.mjs";

export default function Gallery(props) {
  const images = [];

  for(const data of props.imgs) {
    images.push(ArticleImage(data));
  }
}