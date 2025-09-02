// lib/auth.ts
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export function saveToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function clearToken() {
  Cookies.remove(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
