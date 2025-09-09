import TabMenu from '../../components/TabMenu';
import { cn } from '../../util/tailwind-merge';
import TabContent from '../../components/TabContent';
import useMainPage from './hooks/useMainPage';

const MainPage = () => {
  const hooks = useMainPage();
  return (
    <>
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="text-lg font-bold">프로젝트 관리</h3>

        <div className="flex items-center gap-[10px]">
          <input
            type="text"
            id="search-box"
            name="search-box"
            className={`${cn(
              'text-sm text-gray-800',
              `bg-gray-50 border border-gray-300 rounded-lg`,
              'h-[30px] min-w-[300px] pl-2',
              'focus:ring-blue-500 focus:border-blue-500 focus:outline-none',
              'placeholder:text-xs'
            )}`}
            placeholder="프로젝트명 또는 프로젝트 코드를 검색해주세요."
            value={hooks.searchValue}
            onChange={(e) => {
              hooks.onInputChange(e);
              hooks.debounceOnInputChange(e.target.value);
            }}
          />
          <button
            className="cursor-pointer h-[30px] px-2 flex items-center justify-center bg-white text-gray-600 rounded-md border border-[#DEDEDE] text-xs"
            onClick={hooks.onClickCreate}
          >
            프로젝트 등록
          </button>
        </div>
      </div>

      <ul className="flex items-center justify-around w-full bg-white flex-shrink-0">
        {hooks.departmentDatas.map((data) => {
          return (
            <TabMenu
              key={data.deptCode}
              currentTab={hooks.currentTab}
              tabMenu={data}
              setCurrentTab={hooks.setCurrentTab}
            />
          );
        })}
      </ul>

      <div className={cn(`flex-1 overflow-auto`)}>
        <TabContent
          key={`tab-content`}
          deptCode={hooks.currentTab?.deptCode}
          projects={hooks.projectDatas}
          onClickDelete={hooks.onClickDelete}
          onClickEdit={hooks.onClickEdit}
        />
      </div>
    </>
  );
};
export default MainPage;
