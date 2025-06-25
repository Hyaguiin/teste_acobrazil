import api from '../utils/http';

export const fetchChecklists = async (userId) => {
  const { data } = await api.get(`/checklist/user/${userId}`);
  return data;
};

export const createChecklist = async (payload) => {
  const { data } = await api.post('/checklist', payload);
  return data.checklist;
};
