import { Link, useLocation } from 'react-router-dom';
import classes from './InquiriesListItem.module.css';

const InquiriesListItem = ({ id, content, date, type }) => {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname}/${id}`}>
      <li className={classes['inquiries-list-Item']}>
        <div className={classes['inquiries-list-Item__type']}>
          <p>{type}</p>
        </div>
        <div className={classes['inquiries-list-Item__title']}>
          <p>{content}</p>
        </div>
        <div className={classes['inquiries-list-Item__date']}>
          <p>{date}</p>
        </div>
      </li>
    </Link>
  );
}

export default InquiriesListItem;