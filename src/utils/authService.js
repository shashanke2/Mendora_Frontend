import api from "../utils/api";

export const signupProvider = async (data) => {
  const res = await api.post("/provider/signup", data);
  return res.data;
};

export const loginProvider = async (data) => {
  const res = await api.post("/provider/login", data);
  if (res.data.token) localStorage.setItem("accessToken", res.data.token);
  return res.data;
};
