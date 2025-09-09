import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import MainPage from '../../page/main/MainPage';

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
          element: <MainPage />,
        },
      ],
    },
  ]);
  return {
    router,
  };
};

export default useAppRoute;
