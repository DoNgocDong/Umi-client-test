export interface PageData<T> {
  total: number;
  list_data: Array<T>;
}

export interface ResponseDTO<T> {
  data: T;
  message: string;
  code: number;
  result: T;
}