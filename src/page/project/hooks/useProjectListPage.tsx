import { useCallback, useEffect, useState } from 'react';
import { deleteProject, getDatas, type DepartmentDataType, type ProjectsDataType } from '../../../server/server';
import useNavigation from '../../../router/hook/useNavigation';
import { useDebounceEvent } from '../../../util/useDebounceEvent';

interface hooks {
  departmentDatas: DepartmentDataType[];
  projectDatas: ProjectsDataType[];
  currentTab: DepartmentDataType | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<DepartmentDataType | null>>;
  searchValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  debounceOnInputChange: (value: string) => void;
  onClickDelete: (id: number) => Promise<void>;
  onClickEdit: (id: number) => Promise<void>;
  onClickCreate: () => void;
}

const useProjectListPage = (): hooks => {
  const navi = useNavigation();
  const [departmentDatas, setDepartmentDatas] = useState<DepartmentDataType[]>([]);
  const [projectDatas, setProjectDatas] = useState<ProjectsDataType[]>([]);
  const [searchDatas, setSearchDatas] = useState<ProjectsDataType[]>([]);
  const [currentTab, setCurrentTab] = useState<DepartmentDataType | null>(null);
  // const [reload, setReload] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 검색값에 따라 콘텐츠 검색
  const handleSearch = useCallback(
    (value: string) => {
      const filteredProjects = searchDatas.filter((project) => {
        if (!value || value.trim() === '') {
          return true;
        }
        const searchValue = value.toLowerCase();
        const projectCode = project.projectCode?.toLowerCase() || '';
        const projectName = project.projectName?.toLowerCase() || '';
        return projectCode.includes(searchValue) || projectName.includes(searchValue);
      });

      setProjectDatas(filteredProjects);
    },
    [searchDatas]
  );

  // 디바운스 검색 이벤트
  const debounceOnInputChange = useDebounceEvent(handleSearch, 300);

  // 콘텐츠 삭제
  const onClickDelete = async (id: number) => {
    try {
      const res = await deleteProject<ProjectsDataType>(id);
      alert(`${res.projectName} 프로젝트가 삭제되었습니다.`);
      await loadData();
    } catch (err) {
      console.log('데이터 삭제 중 오류가 발생했습니다.', err);
    }
  };

  // 콘텐츠 수정 페이지 이동
  const onClickEdit = async (id: number) => {
    console.log('수정ㄴ');
    console.log(id, '====> id');
    navi.goEditPage(id);
  };

  // 콘텐츠 생성 페이지 이동
  const onClickCreate = () => {
    console.log('등록');
    navi.goCreatePage();
  };

  // API 호출 연결
  const loadData = async () => {
    const departmentDatas = await getDatas<DepartmentDataType>('department');
    const projectsDatas = await getDatas<ProjectsDataType>('projects');
    setDepartmentDatas(departmentDatas);
    setProjectDatas(projectsDatas);
    setSearchDatas(projectsDatas);
  };

  // API 호출
  useEffect(() => {
    loadData();
  }, []);

  // 초기 탭 메뉴
  useEffect(() => {
    if (departmentDatas.length === 0) return;
    // currentTab이 없을 때만 적용
    if (currentTab === null) {
      setCurrentTab(departmentDatas[0]);
    }
  }, [departmentDatas]);

  return {
    departmentDatas,
    projectDatas,
    currentTab,
    setCurrentTab,
    searchValue,
    onInputChange,
    debounceOnInputChange,
    onClickDelete,
    onClickEdit,
    onClickCreate,
  };
};

export default useProjectListPage;
