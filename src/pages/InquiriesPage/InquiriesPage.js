import { useEffect, useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';

import classes from './InquiriesPage.module.css';
import { NewsList, NewsListItem } from '../../entities/index';
import { API_URL } from '../../app/globals';

const InquiresPage = () => {
  const token = useRouteLoaderData('root');
  const userId = localStorage.getItem('userId');

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);

      const response = await fetch(
        API_URL + '/support/inquiries',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { inquiries } = await response.json();

      return inquiries;
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
      {token && (
        <NewsList>
          {data?.map((inquiries, index) => (
            <NewsListItem
              key={inquiries.id}
              id={inquiries.id}
              title={inquiries.content}
              date={inquiries.date}
              type={inquiries.type}
            />
          ))}
        </NewsList>
      )}
      {!token && <p>문의내역을 확인 하려면 로그인이 필요합니다.</p>}
    </>
  );
};

export default InquiresPage;
