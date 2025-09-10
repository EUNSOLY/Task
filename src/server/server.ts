export interface ProjectsDataType {
  id?: string | undefined;
  deptCode: string;
  projectCode: string;
  projectName: string;
  year: number;
  startDate: string;
  endDate: string;
}
export interface DepartmentDataType {
  deptCode: string;
  deptName: string;
}

// 전체 가져오기
export const getDatas = async <T>(qeury: string): Promise<T[]> => {
  const url = `http://localhost:4000/${qeury}`;

  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return res;
};

// 특정 데이터 가져오기
export const getFindData = async <T>(qeury: string, id: string): Promise<T> => {
  const url = `http://localhost:4000/${qeury}/${id}`;

  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return res;
};

// 데이터 추가
export const createData = async <T>(qeury: string, data: Omit<T, 'id'>): Promise<T> => {
  const url = `http://localhost:4000/${qeury}`;

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return res;
};
// 데이터 삭제
export const deleteProject = async <T>(id: number): Promise<T> => {
  const url = `http://localhost:4000/projects/${id}`;

  const res = await fetch(url, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return res;
};
