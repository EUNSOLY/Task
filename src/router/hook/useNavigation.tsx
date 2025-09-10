import { useNavigate, type NavigateOptions } from 'react-router-dom';

interface hooks {
  goCreatePage: (options?: NavigateOptions | undefined) => void;
  goEditPage: (id: number, options?: NavigateOptions | undefined) => void;
}
const useNavigation = () => {
  const navi = useNavigate();
  const goCreatePage = (options?: NavigateOptions | undefined) => {
    navi('/project/create', options);
  };
  const goEditPage = (id: number, options?: NavigateOptions | undefined) => {
    navi(`/project/edit?id=${id}`, options);
  };

  return {
    goCreatePage,
    goEditPage,
  };
};

export default useNavigation;
