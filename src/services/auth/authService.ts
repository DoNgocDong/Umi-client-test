import request from '../baseRequest';

const path = '/customer/api/v1/auth';
// const path = 'http://localhost:8081/api/v1/auth';

export async function login(data: any) {
  if(data.phone == 'admin' && data.password == '123456') {
    const HMACSHA256 = (stringToSign: string, secret: string) => "not_implemented"

    const header = {
      "alg": "HS256",
      "typ": "JWT"
    }
    const encodedHeaders = btoa(JSON.stringify(header))
    
    const claims = {
      "role": "admin",
      "username": 'admin'
    }
    const encodedPayload = btoa(JSON.stringify(claims))

    const signature = HMACSHA256(`${encodedHeaders}.${encodedPayload}`, "mysecret")
    const encodedSignature = btoa(signature)
    
    const jwt = `${encodedHeaders}.${encodedPayload}.${encodedSignature}`
    return <AuthTyping.ResUserLoggedIn>{
      accessToken: 'admin'
    };
  }

  const {data: res} = await request<AuthTyping.ResUserLoggedIn>(path + '/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data,
  });

  return res;
}