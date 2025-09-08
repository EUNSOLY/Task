import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';

interface Hooks {
  router: any;
}

const useAppRoute = (): Hooks => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <div>메인</div>,
        },
        {
          path: 'test',
          element: <div>테스트</div>,
        },
      ],
    },
    {
      path: '/abc',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <div>abc 메인</div>,
        },
        {
          path: 'test',
          element: <div>abc테스트</div>,
        },
      ],
    },
  ]);
  return {
    router,
  };
};

export default useAppRoute;
