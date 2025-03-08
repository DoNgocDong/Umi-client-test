export async function login(data: AuthTyping.LoginData): Promise<AuthTyping.ResUserLoggedIn> {
  if( (data.username==='admin') && (data.password==='123456') ) {
    return {
      username: data.username
    };
  }

  throw new Error('Invalid login info!')
}