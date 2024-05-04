import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { NewsList, NewsListItem } from '../../entities';
import { Pagination } from '../../widgets';
import { API_URL } from '../../app/globals';

const AllNewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const newsCount = useLoaderData();

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch(
        API_URL + '/news/all?page=' + currentPage
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
  }, [currentPage]);

  return (
    <>
      <NewsList>
        {data?.map((news) => (
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

export default AllNewsPage;
