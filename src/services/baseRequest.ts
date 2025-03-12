import { request } from '@umijs/max';
import { ResponseDTO } from '@/dtos/response';

const serviceUri = process.env.REACT_APP_SERVICE_URI || 'http://localhost:8080';

const apiRequest =
  <T>(url: string,
      opts: { [key: string]: any },
  ): Promise<ResponseDTO<T>> => {
  return request<ResponseDTO<T>>(serviceUri + url, {
    ...opts,
  });
};

export default apiRequest;