import { createBrowserRouter, redirect } from 'react-router-dom';

import {
  RootLayout,
  rootLayoutLoader,
  NewsLayout,
  SupportLayout,
  AuthLayout,
} from './layouts/index';
import {
  HomePage,
  NewsAllPage,
  NewsNoticesPage,
  NewsMaintenancePage,
  NewsDetailPage,
  newsDetailsLoader,
  NewsUpdatesPage,
  DownloadPage,
  InquiryPage,
  InquiriesPage,
  LoginPage,
  SignupPage,
  ErrorPage,
} from '../pages/index';
import { API_URL } from './globals';

const appRouter = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    loader: rootLayoutLoader,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'news',
        children: [
          {
            element: <NewsLayout />,
            children: [
              {
                path: 'all',
                element: <NewsAllPage />,
                loader: async () => {
                  const response = await fetch(
                    API_URL + '/news/count'
                  );

                  if (!response.ok) {
                    const error = new Error(
                      'An error occurred while fetching the news total count'
                    );
                    error.code = response.status;
                    error.info = await response.json();
                    throw error;
                  } else {
                    const { totalNewsCount } = await response.json();
                    return totalNewsCount;
                  }
                },
              },
              { path: 'notices', element: <NewsNoticesPage /> },
              { path: 'maintenance', element: <NewsMaintenancePage /> },
              { path: 'updates', element: <NewsUpdatesPage /> },
            ],
          },
          {
            element: <NewsDetailPage />,
            loader: newsDetailsLoader,
            children: [
              { path: 'all/:id', element: null },
              { path: 'notices/:id', element: null },
              { path: 'maintenance/:id', element: null },
              { path: 'updates/:id', element: null },
            ],
          },
        ],
      },
      {
        element: <SupportLayout />,
        loader: () => {
          const token = localStorage.getItem('token');

          if (!token) {
            alert('로그인이 필요한 페이지입니다.');

            return redirect('/login');
          }

          return null;
        },
        children: [
          { path: 'support/inquiry', element: <InquiryPage /> },
          { path: 'support/inquiries', element: <InquiriesPage /> },
        ],
      },
      { path: 'download', element: <DownloadPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    loader: () => {
      const token = localStorage.getItem('token');

      if (token) {
        alert('이미 로그인되어 있습니다.');

        return redirect('/');
      }

      return null;
    },
    children: [
      {
        path: 'login',
        element: <LoginPage />,
        loader: async () => {
          const response = await fetch(API_URL + '/captcha/isCaptcha');

          if (!response.ok) {
            const error = new Error(
              'An error occurred while checking if the CAPTCHA is required'
            );
            error.code = response.status;
            error.info = await response.json();
            throw error;
          } else {
            const { isCaptcha } = await response.json();
            return isCaptcha;
          }
        },
      },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]);

export default appRouter;
