import { createBrowserRouter } from 'react-router-dom';

import {
  RootLayout,
  rootLayoutLoader,
  NewsLayout,
  SupportLayout,
  supportLayoutLoader,
  AuthLayout,
  authLayoutLoader,
} from './layouts/index';
import {
  HomePage,
  NewsPage,
  NewsDetailPage,
  DownloadPage,
  downloadPageLoader,
  InquiryPage,
  InquiriesPage,
  inquiriesPageLoader,
  InquiriesDetailPage,
  inquiriesDetailsLoader,
  LoginPage,
  loginPageLoader,
  SignupPage,
  ErrorPage,
} from '../pages/index';

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
                element: <NewsPage />,
              },
              {
                path: 'notices',
                element: <NewsPage />,
              },
              {
                path: 'maintenance',
                element: <NewsPage />,
              },
              {
                path: 'updates',
                element: <NewsPage />,
              },
            ],
          },
          {
            id: 'newsDetails',
            element: <NewsDetailPage />,
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
        path: 'support',
        loader: supportLayoutLoader,
        children: [
          {
            element: <SupportLayout />,
            children: [
              { path: 'inquiry', element: <InquiryPage /> },
              {
                path: 'inquiries',
                element: <InquiriesPage />,
                loader: inquiriesPageLoader,
              },
            ],
          },
          {
            path: 'inquiries/:id',
            element: <InquiriesDetailPage />,
            loader: inquiriesDetailsLoader,
          },
        ],
      },
      {
        path: 'download',
        element: <DownloadPage />,
        loader: downloadPageLoader,
      },
    ],
  },
  {
    element: <AuthLayout />,
    loader: authLayoutLoader,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
        loader: loginPageLoader,
      },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]);

export default appRouter;
