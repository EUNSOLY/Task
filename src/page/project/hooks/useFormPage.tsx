import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getFindData, type ProjectsDataType } from '../../../server/server';

interface hooks {
  id: string | null;
  inputList: {
    label: string;
    value: string;
    type: string;
    isRequired: boolean;
    placeholder: string;
    defaultValue?: string;
  }[];
  formData: Partial<ProjectsDataType>;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, type: string, key: string) => void;
}
const useFormPage = (): hooks => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const id: string | null = searchParams.get('id') || null; // 생성, 수정 체크값
  const [formData, setFormData] = useState<Partial<ProjectsDataType>>({});

  const inputList = [
    {
      label: '부서코드',
      value: 'deptCode',
      type: 'text',
      isRequired: true,
      placeholder: '부서코드를 입력하세요.',
      defaultValue: '',
    },
    {
      label: '프로젝트코드',
      value: 'projectCode',
      type: 'text',
      isRequired: true,
      placeholder: '프로젝트코드를 입력하세요.',
      defaultValue: '',
    },
    {
      label: '프로젝트명',
      value: 'projectName',
      type: 'text',
      isRequired: true,
      placeholder: '프로젝트코드를 입력하세요.',
    },
    { label: '년도', value: 'year', type: 'text', isRequired: true, placeholder: '년도를 입력하세요. ex) 2024' },
    { label: '시작일', value: 'startDate', type: 'date', isRequired: true, placeholder: '시작일을 선택해주세요.' },
    { label: '종료일', value: 'endDate', type: 'date', isRequired: false, placeholder: '종료일을 선택해주세요.' },
  ];

  //input onchange
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, type: string, key: string) => {
    console.log(e, 'e');
    console.log(e.target.value, 'e');
    console.log(type, 'type');
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  // 수정이라면 맞는 값 수정
  const loadFormData = async (id: string) => {
    const data = await getFindData<ProjectsDataType>('projects', id);
    setFormData(data);
  };

  useEffect(() => {
    if (id) {
      loadFormData(id);
    }
  }, [id]);

  useEffect(() => {
    if (!location.state) return;
    setFormData({ ...formData, deptCode: location.state.deptCode, projectCode: location.state.projectCode });
  }, [location.state]);

  return {
    id,
    inputList,
    formData,
    onChangeInput,
  };
};

export default useFormPage;
