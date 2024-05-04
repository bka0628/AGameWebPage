import { useEffect, useState } from 'react';

import { NewsList, NewsListItem } from '../../entities/index';
import { Pagination } from '../../widgets/index';
import { API_URL } from '../../app/globals';

const MaintenancePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsCount, setNewsCount] = useState(0);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function fetchNewsTotalCount() {
      const response = await fetch(
        API_URL + '/news/count?type=maintenance'
      );

      if (!response.ok) {
        const error = new Error(
          'An error occurred while fetching the news total count'
        );
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { totalNewsCount } = await response.json();

      return totalNewsCount;
    }

    fetchNewsTotalCount()
      .then((count) => {
        setNewsCount(count);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch(
        API_URL + '/news/maintenance?page=' + currentPage
      );

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { news } = await response.json();

      return news;
    }

    fetchEvents()
      .then((news) => {
        setData(news);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <NewsList>
        {data?.map((news, index) => (
          <NewsListItem
            key={news.id}
            id={news.id}
            title={news.title}
            date={news.date}
            type={news.type}
          />
        ))}
      </NewsList>
      <Pagination
        currentPage={currentPage}
        totalItemsCount={newsCount}
        onChangePage={pageChangeHandler}
      />
    </>
  );
};

export default MaintenancePage;
