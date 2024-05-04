import { NavLink } from 'react-router-dom';

import classes from './SupportNavbar.module.css';

const SupportNavbar = () => {
  return (
    <nav className={classes.navbar}>
      <NavLink
        to="/support/inquiry"
        className={({ isActive }) => (isActive ? classes['active'] : '')}
      >
        1대1 문의
      </NavLink>
      <NavLink
        to="/support/inquiries"
        className={({ isActive }) => (isActive ? classes['active'] : '')}
      >
        문의 내역
      </NavLink>
    </nav>
  );
};

export default SupportNavbar;
