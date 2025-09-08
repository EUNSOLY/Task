import { useEffect, useState } from 'react';
import TabMenu from '../components/TabMenu';
import { cn } from '../util/tailwind-merge';

export type DataType = {
  deptCode: string;
  deptName: string;
  projects: ProjectsType[];
};

type ProjectsType = {
  endDate: string;
  key: number;
  projectCode: string;
  projectName: string;
  startDate: string;
  year: number;
};

const MainPage = () => {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [currentTab, setCurrentTab] = useState<DataType | null>(null);

  //   NOTE : 최초 1회 API 호출
  useEffect(() => {
    fetch('http://localhost:4000/datas')
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      });
  }, []);

  useEffect(() => {
    if (datas.length === 0) return;
    console.log(datas);
    setCurrentTab(datas[0]);
  }, [datas]);

  return (
    <>
      <div className="flex items-center justify-between">
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
              'focus:ring-blue-500 focus:border-blue-500',
              'placeholder:text-xs'
            )}`}
            placeholder="프로젝트명 또는 프로젝트 코드를 검색해주세요."
          />
          <button className="cursor-pointer w-[68px] h-[30px] flex items-center justify-center bg-white text-gray-600 rounded-md border border-[#DEDEDE]">
            등록
          </button>
        </div>
      </div>

      <ul className="flex items-center justify-around w-full bg-white rounded-[11px] py-px px-[3px] text-[#333]">
        {datas.map((data) => {
          return <TabMenu key={data.deptCode} currentTab={currentTab} tabMenu={data} setCurrentTab={setCurrentTab} />;
        })}
      </ul>

      {/* {datas.map((data) => {
        return (
          <div key={data.deptCode} className={cn(currentTab?.deptCode === data.deptCode ? 'block' : 'hidden')}>
            {data.projects.map((project) => {
              return <div key={project.key}>{project.projectName}</div>;
            })}
          </div>
        );
      })} */}
      {datas.map((data) => {
        if (currentTab?.deptCode !== data.deptCode) return null;

        return (
          <table key={data.deptCode} className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="">
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">프로젝트명</th>
                <th className="border border-gray-300 px-4 py-2 text-left">프로젝트 코드</th>
                <th className="border border-gray-300 px-4 py-2 text-left">시작일</th>
                <th className="border border-gray-300 px-4 py-2 text-left">종료일</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => (
                <tr key={project.key} className="">
                  <td className="border border-gray-300 px-4 py-2">{project.key}번</td>
                  <td className="border border-gray-300 px-4 py-2">{project.projectName}</td>
                  <td className="border border-gray-300 px-4 py-2">{project.projectCode}</td>
                  <td className="border border-gray-300 px-4 py-2">{project.startDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{project.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </>
  );
};
export default MainPage;
