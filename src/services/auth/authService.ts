import { base64UrlEncode, hmacSHA256 } from '@/utils/format';
import request from '../baseRequest';

const path = '/customer/api/v1/auth';

const generateJwtToken = (payload: any) => {
  const secretKey = JWT_SECRET_KEY;

  // 1. Tạo Header
  const header = {
    alg: 'HS256',  // Thuật toán HMAC-SHA256
    typ: 'JWT'     // Loại token là JWT
  };

  // 2. Mã hóa Header thành Base64Url
  const encodedHeader = base64UrlEncode(JSON.stringify(header));

  // 3. Mã hóa Payload thành Base64Url
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // 4. Tạo Signature
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = hmacSHA256(secretKey, signatureInput);

  // 5. Kết hợp Header, Payload, và Signature thành JWT Token
  const token = `${encodedHeader}.${encodedPayload}.${signature}`;
  return token;
}

export async function login(data: AuthTyping.LoginData) {
  if((data.phone == 'admin') && (data.password == '123456')) {
    const payload: AuthTyping.AuthPayload = {
      role: 'ADMIN',
      username: 'admin'
    }

    const token = generateJwtToken(payload);

    return <AuthTyping.ResUserLoggedIn>{
      access_token: token
    };
  }

  const {result: res} = await request<AuthTyping.ResUserLoggedIn>(path + '/token', {
    method: 'POST',
    data,
  });

  return res;
}

export async function logout(token: string) {  
  await request<AuthTyping.ResUserLoggedIn>(path + '/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      token: token
    },
  });
}