import request from '../baseRequest';
import { PageData } from '@/dtos/response';
import { PageInfo, PageReqData } from '@/dtos/request';

const path = '/branch';

export async function getBranchList(params?: PageReqData) {
  const pageParams: PageInfo = {
    page: params?.current,
    pageSize: params?.pageSize,
  }

  return request<PageData<BranchTyping.BranchInfo>>(path, {
    method: 'GET',
    params: pageParams,
  });
}

export async function createBranch(data: BranchTyping.BranchDTO) {
  return request<PageData<BranchTyping.BranchInfo>>(path, {
    method: 'POST',
    data: data,
  })
}

export async function deleteBranchIds(ids: String[]) {
  return request(path, {
    method: 'DELETE',
    data: ids
  })
}