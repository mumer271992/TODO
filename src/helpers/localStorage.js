export const  create = (item) => {
  let dataList = getList();
  dataList.push(item);
  localStorage.setItem('todoData', JSON.stringify(dataList));
} 

export const getList = () => {
  let data = localStorage.getItem('todoData');
  return data !== null ? JSON.parse(data) : [];
}

export const update = (id, data) => {
  let dataList = getList();
  let targetIndex = dataList.findIndex(item => item.uuid === id);
  if (targetIndex > -1) {
      dataList[targetIndex] = { ...dataList[targetIndex], ...data };
  }
  localStorage.setItem('todoData', JSON.stringify(dataList));
}