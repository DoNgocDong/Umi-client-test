declare namespace AuthTyping {
  interface LoginData {
    phone: string;
    password: string;
  }

  interface ResUserLoggedIn {
    accessToken: string;
    expiresIn: string;
    refreshExpiresIn: string;
    refreshToken: string;
    tokenType: string;
    idToken: string;
    scope: string;
  }
}