import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createData, getFindData, type ProjectsDataType } from '../../../server/server';
import useNavigation from '../../../router/hook/useNavigation';

interface hooks {
  id: string | null;
  inputList: {
    label: string;
    value: string;
    type: string;
    isRequired: boolean;
    placeholder?: string;
    defaultValue?: string;
    optionList?: { label: string; value: string }[];
  }[];
  formData: Partial<ProjectsDataType>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ProjectsDataType>>>;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  onChangeSelect: (
    value: {
      label: string;
      value: string;
    } | null,
    key: string
  ) => void;

  selectStateDept: {
    label: string;
    value: string;
  } | null;

  onClickSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}
const useFormPage = (): hooks => {
  const navi = useNavigation();
  const [searchParams] = useSearchParams();
  const id: string | null = searchParams.get('id') || null; // 생성, 수정 체크값
  const [formData, setFormData] = useState<Partial<ProjectsDataType>>({});

  const inputList = [
    {
      label: '담당부서',
      value: 'deptCode',
      type: 'text',
      isRequired: true,
      optionList: [
        { label: '담당부서를 선택해주세요', value: '' },
        { label: '플랫폼사업관리부', value: '1000' },
        { label: '전략사업본부', value: '2000' },
        { label: '서비스제작부', value: '3000' },
      ],
    },
    {
      label: '프로젝트코드',
      value: 'projectCode',
      type: 'text',
      isRequired: true,
      placeholder: '프로젝트코드를 입력하세요.',
    },
    {
      label: '프로젝트명',
      value: 'projectName',
      type: 'text',
      isRequired: true,
      placeholder: '프로젝트명을 입력하세요.',
    },
    { label: '년도', value: 'year', type: 'text', isRequired: true, placeholder: '년도를 입력하세요. ex) 2024' },
    { label: '시작일', value: 'startDate', type: 'date', isRequired: true, placeholder: '시작일을 선택해주세요.' },
    { label: '종료일', value: 'endDate', type: 'date', isRequired: false, placeholder: '종료일을 선택해주세요.' },
  ];

  // id가 존재 할 때 셀렉트값 지정 [수정 시]
  const initSelectValue = () => {
    let newData = null;

    const deptCodeMap: { [key: string]: string } = {
      '1000': '플랫폼사업관리부',
      '2000': '전략사업본부',
      '3000': '서비스제작부',
    };
    if (formData.deptCode && deptCodeMap[formData.deptCode]) {
      newData = { label: deptCodeMap[formData.deptCode], value: formData.deptCode };
    }

    return newData;
  };

  const selectStateDept = useMemo(() => initSelectValue(), [formData.deptCode]);

  //input onchange
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // select onChange
  const onChangeSelect = (value: { label: string; value: string } | null, key: string) => {
    const text = value?.value === '1000' ? 'XXXX-' : value?.value === '2000' ? 'YYYY-' : 'ZZZ-';
    setFormData((prev) => ({
      ...prev,
      [key]: value?.value ?? '',
      projectCode: text,
    }));
  };

  // id가 존재 할 때 데이터 로드[수정 시]
  const loadFormData = async (id: string) => {
    const data = await getFindData<ProjectsDataType>('projects', id);
    setFormData(data);
  };

  useEffect(() => {
    if (id) {
      loadFormData(id);
    }
  }, [id]);

  const onClickSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // 필수 값 체크
    if (!formData.deptCode) {
      alert('부서를 선택해주세요.');
      return; // 진행 중단
    }
    if (!formData.projectCode) {
      alert('프로젝트코드를 선택해주세요.');
      return;
    }

    if (!formData.projectName) {
      alert('프로젝트명을 입력해주세요.');
      return;
    }
    if (!formData.year) {
      alert('년도를 입력해주세요');
      return;
    }

    if (!formData.startDate) {
      alert('시작일을 입력해주세요.');
      return;
    }

    if (!formData.endDate) {
      alert('종료일을 입력해주세요.');
      return;
    }

    try {
      const projectData: Omit<ProjectsDataType, 'id'> = {
        deptCode: formData.deptCode!,
        projectCode: formData.projectCode!,
        projectName: formData.projectName!,
        year: Number(formData.year!),
        startDate: formData.startDate!,
        endDate: formData.endDate!,
      };

      const result: ProjectsDataType = await createData<ProjectsDataType>('projects', projectData);
      alert(`프로젝트 : [${result.projectName}]가 정상적으로 생성되었습니다.`);
      navi.goProjectListPage();
    } catch (err) {
      alert('신규 프로젝트 생성 중 오류가 발생했습니다.');
      console.log('데이터 생성 중 오류 발생 : ', err);
    }
  };

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  return {
    id,
    inputList,
    formData,
    setFormData,
    onChangeInput,
    onChangeSelect,
    selectStateDept,

    onClickSubmit,
  };
};

export default useFormPage;
