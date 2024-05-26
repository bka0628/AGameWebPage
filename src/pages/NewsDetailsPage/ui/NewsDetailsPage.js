import { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { PageTitle } from '../../../shared';
import { NewsNavbar } from '../../../widgets';
import { API_URL } from '../../../app/globals';

import classes from './NewsDetailsPage.module.css';

const NewsDetailPage = () => {
  const [prevNews, setPrevNews] = useState('');
  const [nextNews, setNextNews] = useState('');
  const { pathname } = useLocation('');
  const [news, setNews] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const path = pathname.replace(/\d/g, '');

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`${API_URL}/news/${id}`);

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const news = await response.json();

      return news;
    }

    fetchEvents()
      .then((news) => {
        setNews(news);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    async function fetchEvents() {
      let newsType = '';

      if (pathname.includes('notices')) {
        newsType = '?type=Announcement';
      }
      if (pathname.includes('maintenance')) {
        newsType = '?type=maintenance';
      }
      if (pathname.includes('updates')) {
        newsType = '?type=update';
      }

      const response = await fetch(
        `${API_URL}/news/${id}/prev-next${newsType}`
      );

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const prevNextNews = await response.json();

      let prevNews;
      let nextNews;

      if (prevNextNews.length > 0) {
        if (prevNextNews[0].id < news.id) {
          prevNews = prevNextNews[0];
          if (prevNextNews.length > 1 && prevNextNews[1].id > news.id) {
            nextNews = prevNextNews[1];
          }
        } else {
          nextNews = prevNextNews[0];
        }
      }

      return { prevNews, nextNews };
    }

    fetchEvents()
      .then(({ prevNews, nextNews }) => {
        setPrevNews(prevNews);
        setNextNews(nextNews);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, pathname, news]);

  return (
    <>
      <NewsNavbar />
      <PageTitle>{news?.type}</PageTitle>
      <div className={classes['news-detail__header']}>
        <h3>{news?.title}</h3>
        <p>{news?.date}</p>
      </div>
      <div className={classes['news-detail__content']}>
        <p>{news?.content}</p>
      </div>
      <div className={classes['news-detail__footer']}>
        {nextNews ? (
          <Link to={`${path}${nextNews.id}`}>
            <div className={classes['news-detail__footer__item']}>
              <div>다음글</div>
              <div>{nextNews.title}</div>
              <div></div>
            </div>
          </Link>
        ) : (
          <div className={classes['news-detail__footer__item']}>
            <div>다음글</div>
            <div>다음글이 없습니다.</div>
            <div></div>
          </div>
        )}
        {prevNews ? (
          <Link to={`${path}${prevNews.id}`}>
            <div className={classes['news-detail__footer__item']}>
              <div>이전글</div>
              <div>{prevNews.title}</div>
              <div></div>
            </div>
          </Link>
        ) : (
          <div className={classes['news-detail__footer__item']}>
            <div>다음글</div>
            <div>다음글이 없습니다.</div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsDetailPage;
