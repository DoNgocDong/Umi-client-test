export interface PageInfo {
  page?: number;
  pageSize?: number;
}

export interface PageReqData {
  keyword?: string;
  /** current */
  current?: number;
  /** pageSize */
  pageSize?: number;
}