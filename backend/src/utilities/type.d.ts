type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

type UserStatusType = typeof UserStatusEnum[keyof typeof UserStatusEnum];
