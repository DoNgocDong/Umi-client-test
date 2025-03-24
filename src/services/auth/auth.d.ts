declare namespace AuthTyping {
  interface LoginData {
    phone: string;
    password: string;
  }

  interface RealmAccess {
    roles: Array<string>;
  }

  interface AuthPayload {
    role: string;
    username: string;
    name?: string;
    realm_access?: RealmAccess;
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