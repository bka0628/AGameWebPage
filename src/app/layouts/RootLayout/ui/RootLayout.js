import { Outlet, useLoaderData } from 'react-router-dom';

import { Header } from '../../../../widgets/index';
import useTokenValidation from '../model/useTokenValidation';

const RootLayout = () => {
  const token = useLoaderData();
  useTokenValidation(token);

  return (
    <div className="flex flex-col w-full h-full ">
      <Header />
      <main className="w-3/4 m-auto mt-16 max-md:w-full max-md:px-5">
        <Outlet />
      </main>
      <footer>
        <div>푸터</div>
      </footer>
    </div>
  );
};

export default RootLayout;
