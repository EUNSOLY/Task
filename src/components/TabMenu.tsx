import type { DataType } from '../page/MainPage';

const TabMenu = ({
  tabMenu,
  currentTab,
  setCurrentTab,
}: {
  tabMenu: DataType;
  currentTab: DataType | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<DataType | null>>;
}) => {
  return (
    <li
      className={`cursor-pointer flex-1 flex justify-center items-center py-[8px] rounded-[16px]
        ${currentTab && currentTab.deptCode === tabMenu.deptCode && 'bg-[#EAEAEE]'}`}
      onClick={() => {
        setCurrentTab(tabMenu);
      }}
    >
      {tabMenu.deptName}
    </li>
  );
};

export default TabMenu;
