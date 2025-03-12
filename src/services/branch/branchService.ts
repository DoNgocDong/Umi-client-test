import request from '../baseRequest';
import { PageData } from '@/dtos/response';
import { PageInfo, PageReqData } from '@/dtos/request';

const path = '/account/api/v1/accounts/branch';
// const path = '/api/v1/accounts/branch';

export async function getPagination(params?: PageReqData) {
  const pageParams: PageInfo = {
    page: params?.current,
    pageSize: params?.pageSize,
  }

  return request<PageData<BranchTyping.BranchInfo>>(path, {
    method: 'GET',
    params: pageParams,
  });
}

export async function create(data: BranchTyping.BranchDTO) {
  return request<PageData<BranchTyping.BranchInfo>>(path, {
    method: 'POST',
    data: data,
  })
}

export async function updateById(id: string, data: BranchTyping.BranchDTO) {
  return request<PageData<BranchTyping.BranchInfo>>(path + `/${id}`, {
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