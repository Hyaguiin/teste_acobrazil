import api from "../utils/http";

export const register = async ({ username, email, password }) => {
  const { data } = await api.post("/user", { username, email, password });
  return data.user;
};
