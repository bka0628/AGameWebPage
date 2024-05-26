import { Outlet, Link, useLocation } from 'react-router-dom';
import classes from './AuthLayout.module.css';

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className={classes['auth__layout']}>
    <div className={classes['auth__container']}>
      <header className={classes['auth__header']}>
        <Link to={'/'}><h1>Agame</h1></Link>
      </header>
      <Outlet />
      <footer className={classes['auth__footer']}>
        {location.pathname === '/login' ? (
          <Link to="/signup">회원 가입</Link>
        ) : location.pathname === '/signup' ? (
          <Link to="/login">로그인</Link>
        ) : null}
      </footer>
    </div>
  </div>
  );
};

export default AuthLayout;
