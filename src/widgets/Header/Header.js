import { useState, useEffect } from 'react';
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';

import { Button } from '../../shared/components';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const token = useRouteLoaderData('root');
  const navigate = useNavigate();

  useEffect(() => {
    setIsNewsOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(0);
  };

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsNewsOpen(false);
    setIsSupportOpen(false);
  };

  const handleNews = () => {
    setIsNewsOpen((prev) => !prev);
  };

  const handleSupport = () => {
    setIsSupportOpen((prev) => !prev);
  }

  return (
    <div className="fixed top-0 z-20 flex items-center justify-between w-full h-20 bg-black px-9 max-md:px-4">
      <div className="flex items-center gap-16 text-white max-xl:gap-6">
        <Link to="/" className="hover:text-red-500 max-md:px-4">
          <h1 className="text-2xl font-bold">Agame</h1>
        </Link>
        <nav className="flex gap-16 text-white max-xl:gap-7 max-md:hidden">
          <Link
            to="/news/all"
            className="flex items-center gap-1 px-4 py-2 hover:bg-neutral-800 hover:rounded-md hover:text-amber-400 "
          >
            새소식
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Link>
          <Link
            to="download"
            className="flex items-center gap-1 px-4 py-2 hover:bg-neutral-800 hover:rounded-md hover:text-amber-400"
          >
            다운로드
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </Link>
          <Link
            to="support/inquiry"
            className="flex items-center gap-1 px-4 py-2 hover:bg-neutral-800 hover:rounded-md hover:text-amber-400"
          >
            고객지원
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Link>
        </nav>
      </div>
      <div className="flex gap-4 max-md:hidden">
        {!token && (
          <>
            <div className="">
              <Link to="/login">
                <Button>로그인</Button>
              </Link>
            </div>
            <div className="">
              <Link to="/signup">
                <Button>회원가입</Button>
              </Link>
            </div>
          </>
        )}
        {token && (
          <div className="">
            <Button onClick={handleLogout}>로그아웃</Button>
          </div>
        )}
      </div>
      <div
        className="hidden p-2 rounded-lg max-md:block hover:bg-neutral-800"
        onClick={handleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-8 h-8 hover:stroke-amber-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 flex justify-end bg-gray-800 bg-opacity-75"
          onClick={handleMenu}
        >
          <div
            class=" bg-neutral-800 p-6 shadow-lg h-full w-64 text-white gap-6 flex flex-col z-40"
            onClick={(e) => e.stopPropagation()}
          >
            {!token && (
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <button className="w-full h-8 text-white rounded bg-neutral-600 hover:bg-neutral-700 hover:border hover:border-white">
                    로그인
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full h-8 text-white rounded bg-neutral-600 hover:bg-neutral-700 hover:border hover:border-white">
                    회원가입
                  </button>
                </Link>
              </div>
            )}
            {token && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <div>
                    <p className="">사용자 닉네임</p>
                    <p className="text-sm">사용자 아이디</p>
                  </div>
                </div>
                <button
                  className="w-full h-8 text-white rounded bg-neutral-600 hover:bg-neutral-700 hover:border hover:border-white"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
            <nav className="flex flex-col gap-4 ">
              <div
                className="flex items-center justify-between hover:text-amber-400"
                onClick={handleNews}
              >
                <p>새소식</p>
                {isNewsOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
              {isNewsOpen && (
                <div className="flex flex-col gap-4">
                  <Link to="/news/all" onClick={handleMenu}>
                    <p>전체</p>
                  </Link>
                  <Link to="/news/notices" onClick={handleMenu}>
                    <p>공지</p>
                  </Link>
                  <Link to="/news/maintenance" onClick={handleMenu}>
                    <p>점검</p>
                  </Link>
                  <Link to="/news/updates" onClick={handleMenu}>
                    <p>업데이트</p>
                  </Link>
                </div>
              )}
              <Link
                to="download"
                className="flex items-center justify-between hover:text-amber-400"
                onClick={handleMenu}
              >
                <p>다운로드</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </Link>
              <div
                className="flex items-center justify-between hover:text-amber-400"
                onClick={handleSupport}
              >
                <p>고객지원</p>
                {isSupportOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
              {isSupportOpen && (
                <div className="flex flex-col gap-4">
                  <Link to="/support/inquiry" onClick={handleMenu}>
                    <p>1대1 문의</p>
                  </Link>
                  <Link to="/support/inquiries" onClick={handleMenu}>
                    <p>문의 내역</p>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
