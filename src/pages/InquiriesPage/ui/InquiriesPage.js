import { useEffect, useState } from 'react';
import { useRouteLoaderData, useLoaderData } from 'react-router-dom';

import { Pagination } from '../../../widgets/index';

import { InquiriesList, InquiriesListItem } from '../../../entities/index';
import { API_URL } from '../../../app/globals';

const InquiresPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const token = useRouteLoaderData('root');
  const InquiresCount = useLoaderData();

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/support/inquiries?page=${currentPage}`,
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
  }, [token, currentPage]);

  return (
    <>
      {token && (
        <InquiriesList>
          {data?.map((inquiries, index) => (
            <InquiriesListItem
              key={inquiries.id}
              id={inquiries.id}
              type={inquiries.type}
              title={inquiries.title}
              date={inquiries.date}
              status={inquiries.status}
            />
          ))}
        </InquiriesList>
      )}
      {!token && <p>문의내역을 확인 하려면 로그인이 필요합니다.</p>}
      <Pagination
        currentPage={currentPage}
        totalItemsCount={InquiresCount}
        onChangePage={pageChangeHandler}
      />
    </>
  );
};

export default InquiresPage;
