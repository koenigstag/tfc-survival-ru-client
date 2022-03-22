import React, { useEffect, useState } from 'react';
import { getVKNews } from "api/commonAPI";
import styles from './News.module.sass';
import Article from './Article';

const VKNews = () => {
  const [news, setNews] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      setIsFetching(true);

      const localnews = localStorage.getItem('news-cache');
      const timestamp = localStorage.getItem('timestamp');
      if (localnews && timestamp + 1000 * 60 * 60 * 24 > Date.now()) {
        setNews(JSON.parse(localnews));
      } else {
        const news = await getVKNews();
        setNews(news);
        localStorage.setItem('news-cache', JSON.stringify(news));
        localStorage.setItem('timestamp', Date.now())
      }

      setIsFetching(false);
    };
    getNews();
  }, []);

  return (
    <section
        id="vk-news"
        className={styles.newsSection}
      >
        {news?.length === 0 ? (
          <center>
            {!isFetching && 'Тут должны были быть новости из VK.com но Крампус их украл 😥'}
          </center>
        ) : (
          news.map((post, index) => {
            // console.log(post);

            return <Article post={post} />
          })
        )}
      </section>
  )
}

export default VKNews;
