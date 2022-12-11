import { lazy } from 'react';
import GlobalLayout from '@/pages/_layout';

const EnterPage = lazy(() => import('@/pages/Enter'));
const RoomPage = lazy(() => import('@/pages/Room'));

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <EnterPage /> },
      { path: '/room/:roomId', element: <RoomPage /> },
    ],
  },
];

export const pages = [{ route: '/' }, { route: '/room/:roomId' }];
