import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <div className="main_wrap">
        <Outlet />
      </div>
      <footer>푸터</footer>
    </div>
  );
};

export default MainLayout;
