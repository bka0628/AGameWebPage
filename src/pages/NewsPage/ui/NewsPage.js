import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NewsList, NewsListItem } from '../../../entities';
import { Pagination } from '../../../widgets';
import { API_URL } from '../../../app/globals';
import classes from './NewsPage.module.css';

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [newsCount, setNewsCount] = useState(0);
  const { pathname } = useLocation();

  const fetchNewsType = () => {
    if (pathname.includes('notices')) return 'Announcement';
    if (pathname.includes('maintenance')) return 'maintenance';
    if (pathname.includes('updates')) return 'update';
    return '';
  };

  useEffect(() => {
    const resetAndFetchNews = async () => {
      setSearch('');
      setCurrentPage(1);
      await fetchNews('', 1);
    };

    resetAndFetchNews();
  }, [pathname]);

  useEffect(() => {
    if (currentPage !== 1 || search !== '') {
      fetchNews();
    }
  }, [currentPage]);

  const fetchNews = async (
    overrideSearch = search,
    overrideCurrentPage = currentPage
  ) => {
    const newsType = fetchNewsType();
    try {
      const response = await fetch(
        `${API_URL}/news/?page=${overrideCurrentPage}&search=${overrideSearch}&type=${newsType}`
      );
      if (!response.ok)
        throw new Error('News fetching failed with status', response.status);

      const json = await response.json();
      setData(json.news);

      const countResponse = await fetch(
        `${API_URL}/news/count?search=${search}&type=${newsType}`
      );
      if (!countResponse.ok)
        throw new Error(
          'Count fetching failed with status',
          countResponse.status
        );

      const countJson = await countResponse.json();
      setNewsCount(countJson.totalNewsCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NewsList>
        {data.map((news) => (
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
      <div className={classes['search']}>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit">검색</button>
        </form>
      </div>
    </>
  );
};

export default NewsPage;
