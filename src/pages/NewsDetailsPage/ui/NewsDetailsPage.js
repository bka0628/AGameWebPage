import { useLoaderData } from 'react-router-dom';
import { PageTitle } from '../../../shared';
import { NewsNavbar } from '../../../widgets';

import classes from './NewsDetailsPage.module.css';

const NewsDetailPage = () => {
  const data = useLoaderData();

  return (
    <>
      <NewsNavbar />
      <PageTitle>{data?.type}</PageTitle>
      <div className={classes['news-detail__header']}>
        <h3>{data?.title}</h3>
        <p>{data?.date}</p>
      </div>
      <div className={classes['news-detail__content']}>
        <p>{data?.content}</p>
      </div>
    </>
  );
};

export default NewsDetailPage;
