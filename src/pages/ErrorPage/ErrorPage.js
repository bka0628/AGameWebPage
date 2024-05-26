import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={classes['error-page']}>
      <h2 className={classes['error-page__title']}>
        죄송합니다. 해당 페이지를 찾을 수 없습니다.
      </h2>
      <p className={classes['error-page__description']}>
        요청하신 페이지가 존재하지 않거나, 현재 이용하시는 페이지의 주소가
        잘못되었을 수 있습니다.
      </p>
      <Link to="/">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default ErrorPage;
