import { request } from '@umijs/max';
import { ResponseDTO } from '@/dtos/response';

const serviceUri = SERVICE_URI || 'http://localhost:8080';

const apiRequest =
  <T>(url: string,
      opts: { [key: string]: any },
  ): Promise<ResponseDTO<T>> => {
  const jwtToken = localStorage.getItem('access_token');

  if((jwtToken != null)) {
    opts['headers']['Authorization'] = 'Bearer ' + jwtToken;
  }

  return request<ResponseDTO<T>>(serviceUri + url, {
    ...opts,
  });
};

export default apiRequest;