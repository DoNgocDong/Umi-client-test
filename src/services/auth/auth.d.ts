declare namespace AuthTyping {
  interface LoginData {
    username: string;
    password: string;
    remember: boolean;
  }

  interface ResUserLoggedIn {
    username: string
  }
}