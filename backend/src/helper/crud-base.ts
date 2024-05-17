import { Request } from 'express';

const getPagination = (req: Request) => {
  const query = req.query;

  const pageSize: number = parseInt((query.pageSize || '10') as string, 10);
  const currentPage: number = parseInt(
    (query.currentPage || '1') as string,
    10,
  );

  return {
    pageSize,
    currentPage,
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  };
};

export const crudBase = {
  getPagination,
};
