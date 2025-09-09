export interface ProjectsDataType {
  id: number;
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

export const getDatas = async <T>(qeury: string): Promise<T[]> => {
  const url = `http://localhost:4000/${qeury}`;

  const res = await fetch(url)
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
