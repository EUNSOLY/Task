import { RouterProvider } from 'react-router-dom';
import useAppRoute from './hook/useAppRoute';

const AppRoute = () => {
  const hooks = useAppRoute();

  return <RouterProvider router={hooks.router} />;
};

export default AppRoute;
