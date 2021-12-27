import axios from "axios";

const api = axios.create({
  //   baseURL: `http://localhost:5000/api`,
  baseURL: `https://wowme.gg/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getToken = async (params: any) => {
  try {
    const res = await api.post("/auth/bnet_token", params);
    if (res.data.success) {
      console.log(res.data);
      setAuthToken(res.data.token);
      return res.data;
    } else {
      console.log(res.data);
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const setAuthToken = (token: any) => {
  delete api.defaults.headers.common["x-auth-token"];

  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
  }
};
