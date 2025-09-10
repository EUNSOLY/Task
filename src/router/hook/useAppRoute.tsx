import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import MainPage from '../../page/main/MainPage';
import ProjectListPage from '../../page/project';
import FormPage from '../../page/project/Form';

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
    {
      path: '/project',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <ProjectListPage />,
        },
        {
          path: 'create',
          element: <FormPage />,
        },
        {
          path: 'edit',
          element: <FormPage />,
        },
      ],
    },
  ]);
  return {
    router,
  };
};

export default useAppRoute;
