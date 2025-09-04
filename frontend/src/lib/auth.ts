import api, { setAuthToken } from "./api";

export async function login(email: string, password: string) {
  const res = await api.post("/login", { email, password });
  const { token } = res.data;
  localStorage.setItem("token", token);
  setAuthToken(token);
  return res.data;
}

export async function signup(email: string, password: string) {
  return api.post("/signup", { email, password });
}

export async function getProfile() {
  return api.get("/profile");
}

export function logout() {
  localStorage.removeItem("token");
  setAuthToken(undefined);
}
