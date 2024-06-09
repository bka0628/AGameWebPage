import { Outlet, Link, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-200">
      <div className="flex flex-col gap-6 px-10 py-12 bg-white rounded-lg shadow-md w-96">
        <header className="mb-7">
          <Link to="/" className="hover:text-red-500">
            <h1 className="text-5xl font-bold text-center">Agame</h1>
          </Link>
        </header>
        <Outlet />
        <footer className="text-center">
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
