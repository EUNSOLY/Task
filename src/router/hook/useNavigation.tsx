import { useNavigate, type NavigateOptions } from 'react-router-dom';

interface hooks {
  goProjectListPage: (options?: NavigateOptions | undefined) => void;
  goCreatePage: (options?: NavigateOptions | undefined) => void;
  goEditPage: (id: number, options?: NavigateOptions | undefined) => void;
}
const useNavigation = (): hooks => {
  const navi = useNavigate();

  const goProjectListPage = (options?: NavigateOptions | undefined) => {
    navi('/project', options);
  };
  const goCreatePage = (options?: NavigateOptions | undefined) => {
    navi('/project/create', options);
  };
  const goEditPage = (id: number, options?: NavigateOptions | undefined) => {
    navi(`/project/edit?id=${id}`, options);
  };

  return {
    goProjectListPage,
    goCreatePage,
    goEditPage,
  };
};

export default useNavigation;
