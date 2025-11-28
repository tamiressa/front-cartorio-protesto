// services/authService.ts
import { fastapiFetch } from "./http/apiClient";

const LOGIN_PATH = process.env.FASTAPI_LOGIN_PATH ?? "/auth/login";
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "access_token";
const JWT_COOKIE_MAX_AGE = Number(process.env.JWT_COOKIE_MAX_AGE ?? "3600");

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  access_token: string;
  token_type: string;
}

export { JWT_COOKIE_NAME, JWT_COOKIE_MAX_AGE, LOGIN_PATH };

/**
 * Autentica no FastAPI e retorna o access_token.
 */
export async function loginFastAPI(
  credentials: LoginRequestDTO
): Promise<LoginResponseDTO> {
  return fastapiFetch<LoginResponseDTO>(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify(credentials)
  });
}