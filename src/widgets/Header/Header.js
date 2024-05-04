import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';

import classes from './Header.module.css';
import { Button } from '../../shared/components';

const Header = () => {
  const token = useRouteLoaderData('root');
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('로그아웃');
    localStorage.removeItem('token');
    navigate(0);
  };

  return (
    <header className={classes['header']}>
      <nav className={classes['header__menu']}>
        <Link to="/">
          <h1>Agame</h1>
        </Link>
        <Link to="/news/all">
          새소식
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </Link>
        <Link to="download">
          다운로드
          <span className="material-symbols-outlined">arrow_outward</span>
        </Link>
        <Link to="support/inquiry">
          고객지원
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </Link>
      </nav>
      <div className={classes['header__auth']}>
        {!token && (
          <>
            <div className={classes['header__auth__item']}>
              <Link to="/login">
                <Button>로그인</Button>
              </Link>
            </div>
            <div className={classes['header__auth__item']}>
              <Link to="/signup">
                <Button>회원가입</Button>
              </Link>
            </div>
          </>
        )}
        {token && (
          <div className={classes['header__auth__item']}>
              <Button onClick={handleLogout}>로그아웃</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
