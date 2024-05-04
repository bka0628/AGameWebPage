import { Link, useLocation } from 'react-router-dom';

import classes from './NewsListItem.module.css';

const NewsListItem = ({ id, title, date, type }) => {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname}/${id}`}>
      <li className={classes['NewsListItem']}>
        <div className={classes['NewsListItem__type']}>
          <p>{type}</p>
        </div>
        <div className={classes['NewsListItem__title']}>
          <p>{title}</p>
        </div>
        <div className={classes['NewsListItem__date']}>
          <p>{date}</p>
        </div>
      </li>
    </Link>
  );
};

export default NewsListItem;
