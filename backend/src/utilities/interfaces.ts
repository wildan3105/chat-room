export interface PaginationInterface {
  total: number;
  pageSize: number;
  currentPage: number;
  record: any[];
}

export interface Route {
  method: Method;
  path: string;
  middleware: any[];
  handler: any;
}
