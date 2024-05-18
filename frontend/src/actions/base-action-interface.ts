import { Action } from 'redux';

export interface BaseAction extends Action {
  hasError?: boolean;
  errMessage?: string;
  currentPage?: number;
  pageSize?: number;
  total?: number;
}

export interface BaseActionState {
  state: string;
  isLoading: boolean;
  hasError?: boolean;
  errMessage?: string;
  currentPage?: number;
  pageSize?: number;
  total?: number;
}

export interface BaseActionData {
  createdDate: string;
  createBy: string;
  updatedDate: string;
  updateBy: string;
  isDelete: boolean;
}
