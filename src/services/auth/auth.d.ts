declare namespace AuthTyping {
  interface LoginData {
    phone: string;
    password: string;
  }

  interface AuthPayload {
    role: string;
    username: string;
    name?: string;
  }

  interface ResUserLoggedIn {
    access_token: string;
    expires_in: string;
    refresh_expires_in: string;
    refresh_token: string;
    token_type: string;
    id_token: string;
    scope: string;
  }
}