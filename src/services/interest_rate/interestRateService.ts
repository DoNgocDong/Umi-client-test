import request from '../baseRequest';
import { PageData } from '@/dtos/response';
import { PageInfo, PageReqData } from '@/dtos/request';
import { InterestRateDTO, InterestRateInfo, Group, Unit } from '@/services/interest_rate/typing';

const path = '/account/api/v1/accounts/interest-rate';

export async function getPagination(params?: PageReqData) {
  const pageParams: PageInfo = {
    page: params?.current,
    pageSize: params?.pageSize,
  }

  return request<PageData<InterestRateInfo>>(path, {
    method: 'GET',
    params: pageParams,
  });
}

export async function create(data: InterestRateDTO) {
  return request<PageData<InterestRateInfo>>(path, {
    method: 'POST',
    data: data,
  })
}

export async function updateById(id: string, data: InterestRateDTO) {
  return request<PageData<InterestRateInfo>>(path + `/${id}`, {
    method: 'PUT',
    data: data,
  })
}

export async function deleteByIds(ids: String[]) {
  return request(path, {
    method: 'DELETE',
    data: ids
  })
}