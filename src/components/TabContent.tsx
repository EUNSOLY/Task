import type { ProjectsDataType } from '../server/server';
import { cn } from '../util/tailwind-merge';

const TabContent = ({
  deptCode,
  projects,
  onClickDelete,
  onClickEdit,
}: {
  deptCode: string | undefined;
  projects: ProjectsDataType[];
  onClickDelete: (id: number) => void;
  onClickEdit: (id: string) => void;
}) => {
  return (
    <div className={cn(`overflow-auto bg-white rounded-lg border border-[#DEDEDE]`)}>
      <table className={cn(`w-full border-collapse bg-white text-sm text-left min-w-[1000px]`)}>
        <thead
          className={cn(`text-xs uppercase bg-gray-50 border-b-2 border-[#DEDEDE] text-[#767676] sticky top-0 z-10`)}
        >
          <tr>
            <th scope="col" className={cn(`px-6 py-4 font-medium min-w-[150px]`)}>
              ID
            </th>
            <th scope="col" className={cn(`px-4 py-4 font-medium min-w-[280px]`)}>
              프로젝트명
            </th>
            <th scope="col" className={cn(`px-4 py-4 font-medium min-w-[150px]`)}>
              프로젝트 코드
            </th>
            <th scope="col" className={cn(`px-4 py-4 font-medium min-w-[150px]`)}>
              시작일
            </th>
            <th scope="col" className={cn(`px-4 py-4 font-medium min-w-[150px]`)}>
              종료일
            </th>
            <th scope="col" className={cn(`px-4 py-4 font-medium text-center min-w-[150px]`)}>
              액션
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={6} className={cn(`px-4 py-4 text-gray-700 text-center`)}>
                데이터가 존재하지 않습니다.
              </td>
            </tr>
          ) : (
            projects.map((project, index) => {
              if (deptCode && deptCode !== project.deptCode) return null;
              return (
                <tr
                  key={project.id}
                  className={cn(
                    `bg-white hover:bg-gray-50 transition-colors duration-150`,
                    `border-b border-[#DEDEDE]`,
                    index % 2 === 0 ? 'bg-gray-25' : 'bg-white'
                  )}
                >
                  <th scope="row" className={cn(`px-6 py-4 font-medium`)}>
                    {project.id}번
                  </th>
                  <td className={cn(`px-4 py-4 text-gray-700`)}>{project.projectName}</td>
                  <td className={cn(`px-4 py-4 text-gray-700 `)}>{project.projectCode}</td>
                  <td className={cn(`px-4 py-4 text-gray-600`)}>{project.startDate}</td>
                  <td className={cn(`px-4 py-4 text-gray-600`)}>{project.endDate}</td>
                  <td className={cn(`px-4 py-4`)}>
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        className={cn(
                          `rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer`,
                          'border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400',
                          'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
                        )}
                        onClick={() => onClickDelete(project.id)}
                      >
                        삭제
                      </button>
                      <button
                        className={cn(
                          `rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer`,
                          'border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-400',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
                        )}
                        onClick={() => onClickEdit(project.projectCode)}
                      >
                        수정
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TabContent;
