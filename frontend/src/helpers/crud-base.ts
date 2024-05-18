import { AxiosRequestConfig } from 'axios';

import { validate, adapter } from '../utilities';
import { CHAT_ROOM_INFO, axiosInstance } from '../constants';

const API_METHOD = {
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  GET: 'GET',
};

export interface IApiResponse {
  data: any | PaginationInterface;
  message?: string;
  isError: boolean;
}

interface PaginationInterface {
  total: number;
  pageSize: number;
  currentPage: number;
  record: any[];
}

const convertObjectCamelToSnack = (body: any, isCreating = false) => {
  const auth = localStorage.getItem(CHAT_ROOM_INFO) || '';
  const isJsonString = validate.isJsonString(auth);
  const user = isJsonString && JSON.parse(auth || '{}');
  const today = new Date().toISOString();

  const data = {
    ...body,
    updateDate: today,
    createBy: user?.userId,
    isDelete: false,
  };

  if (isCreating) {
    data.createdDate = today;
    data.createBy = user?.userId;
  }

  return adapter.convertObjectCamelToSnack(data);
};

const remove = async (url: string, id: string) => {
  return axiosBase(API_METHOD.DELETE, `${url}/${id}`);
};

const get = async (url: string) => {
  return axiosBase(API_METHOD.GET, url);
};

const put = async (
  url: string,
  id: string,
  body: any,
  config?: AxiosRequestConfig,
) => {
  const data = convertObjectCamelToSnack(body);

  return axiosBase(API_METHOD.POST, url, data, config);
};

const post = async (url: string, body: any, config?: AxiosRequestConfig) => {
  const data = convertObjectCamelToSnack(body);

  return axiosBase(API_METHOD.POST, url, data, config);
};

const axiosBase = async (
  method: string,
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
) => {
  switch (method) {
    case API_METHOD.POST: {
      return axiosInstance
        .post(url, body, config)
        .then((res) => {
          return handleResponseSuccessfully(res.data);
        })
        .catch((error) => {
          return handleResponseError(error.response);
        });
    }

    case API_METHOD.PUT: {
      return axiosInstance
        .put(url, body)
        .then((res) => {
          return handleResponseSuccessfully(res.data);
        })
        .catch((error) => {
          return handleResponseError(error.response);
        });
    }

    case API_METHOD.DELETE: {
      return axiosInstance
        .delete(url)
        .then((res) => {
          return handleResponseSuccessfully(res.data);
        })
        .catch((error) => {
          return handleResponseError(error.response);
        });
    }

    case API_METHOD.GET: {
      return axiosInstance
        .get(url)
        .then((res) => {
          return handleResponseSuccessfully(res.data);
        })
        .catch((error) => {
          return handleResponseError(error.response);
        });
    }

    default: {
      throw new Error(
        'API method is not support. Please contact admin to resolve this issue.',
      );
    }
  }
};

const handleResponseSuccessfully = (rest: any) => {
  if (rest.status === 200) {
    return {
      data: rest.data,
      isError: false,
      message: rest.message,
    };
  }

  return {
    data: null,
    isError: true,
    message: rest.message,
  };
};

const handleResponseError = (res: any) => {
  return {
    message: res.data.message,
    data: null,
    isError: true,
  };
};

export const crudBase = {
  post,
  update: put,
  remove,
  get,
};
