export type ResponseData<T = any> = {
  data?: T;
  error?: Error | string;
  issues?: any;
  success: boolean;
};
