import { Outlet, useLoaderData } from 'react-router-dom';

import { Header } from '../../../../widgets/index';
import useTokenValidation from '../model/useTokenValidation';
import classes from './RootLayout.module.css';

const RootLayout = () => {
  const token = useLoaderData();
  useTokenValidation(token);

  return (
    <div className={classes['root_layout']}>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <div>푸터</div>
      </footer>
    </div>
  );
};

export default RootLayout;
