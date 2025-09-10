import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

interface hooks {}
const useFormPage = (): hooks => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id') || null; // 생성, 수정 체크값

  return {};
};

export default useFormPage;
