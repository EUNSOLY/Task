import type { DepartmentDataType } from '../server/server';
import { cn } from '../util/tailwind-merge';

const TabMenu = ({
  tabMenu,
  currentTab,
  setCurrentTab,
}: {
  tabMenu: DepartmentDataType;
  currentTab: DepartmentDataType | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<DepartmentDataType | null>>;
}) => {
  return (
    <li
      className={cn(
        `flex-1 flex justify-center items-center `,
        `cursor-pointer py-[8px]`,
        'hover:text-[#2F68C5]',
        `${currentTab && currentTab.deptCode === tabMenu.deptCode && 'bg-[#2F68C5] text-white hover:text-white'}`
      )}
      onClick={() => {
        setCurrentTab(tabMenu);
      }}
    >
      {tabMenu.deptName}
    </li>
  );
};

export default TabMenu;
