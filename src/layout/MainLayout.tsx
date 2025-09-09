import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen max-h-screen overflow-hidden bg-[#EFF0F3]">
      {/* <Header /> */}
      <div className="main_wrap p-4 flex gap-[10px] flex-col text-[#333] overflow-hidden">
        <Outlet />
      </div>
      {/* <footer>푸터</footer> */}
    </div>
  );
};

export default MainLayout;
