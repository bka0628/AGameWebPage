import { Outlet } from 'react-router-dom';

import { PageTitle } from '../../../../shared/index';
import { SupportNavbar } from '../../../../widgets/index';

const SupportPage = () => {
  return (
    <>
      <PageTitle>고객지원</PageTitle>
      <SupportNavbar />
      <Outlet />
    </>
  );
};

export default SupportPage;
