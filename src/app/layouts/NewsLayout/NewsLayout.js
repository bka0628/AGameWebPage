import { Outlet } from 'react-router-dom';

import { NewsNavbar } from '../../../widgets/index';
import { PageTitle } from '../../../shared/index';

const NewsLayout = () => {
  return (
    <>
      <PageTitle>새소식</PageTitle>
      <NewsNavbar />
      <Outlet />
    </>
  );
};

export default NewsLayout;
