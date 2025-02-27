import { request } from '@umijs/max';
import { ResponseDTO } from '@/dtos/response';

const serviceUri = process.env.REACT_APP_SERVICE_URI || 'http://localhost:8082/api/v1/accounts';

const apiRequest =
  <T>(url: string,
      opts: { [key: string]: any },
  ): Promise<ResponseDTO<T>> => {
  return request<ResponseDTO<T>>(serviceUri + url, {
    ...opts,
  });
};

export default apiRequest;