import request from '../baseRequest';
import { PageData, ResponseDTO } from '@/dtos/response';
import { PageInfo, PageReqData } from '@/dtos/request';

const path = '/account/api/v1/accounts/branch';

export async function getPagination(params?: PageReqData) {
  const pageParams: PageInfo = {
    page: params?.current,
    pageSize: params?.pageSize,
  }

  return request<PageData<BranchTyping.BranchInfo>>(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: pageParams,
  });
}

export async function create(data: BranchTyping.BranchDTO) {
  return request<ResponseDTO<BranchTyping.BranchInfo>>(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data,
  })
}

export async function updateById(id: string, data: BranchTyping.BranchDTO) {
  return request<ResponseDTO<BranchTyping.BranchInfo>>(path + `/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data,
  })
}

export async function deleteByIds(ids: String[]) {
  return request(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    data: ids
  })
}