import { NavLink } from 'react-router-dom';

import classes from './NewsNavbar.module.css';

const NewsNavbar = () => {
  return (
    <nav className={classes.navbar}>
      <NavLink
        to="/news/all"
        className={({ isActive }) => (isActive ? classes['active'] : '')}
      >
        전체
      </NavLink>
      <NavLink
        to="/news/notices"
        className={({ isActive }) => (isActive ? classes['active'] : '')}
      >
        공지
      </NavLink>
      <NavLink
        to="/news/maintenance"
        className={({ isActive }) => (isActive ? classes['active'] : '')}
      >
        점검
      </NavLink>
      <NavLink
        to="/news/updates"
        className={({ isActive }) => (isActive ? classes['active'] : '')}
      >
        업데이트
      </NavLink>
    </nav>
  );
};

export default NewsNavbar;
