import NewsFeed from "./components/news/index.mjs";

// main
export default function App(props) {
  return `
    ${NewsFeed(props)}
  `
}
