import { AxiosRequestConfig, AxiosResponse } from "axios";
export type { AxiosRequestConfig } from "axios";

/**扩展Axios的参数项 */
export interface CreateHttpOptions extends AxiosRequestConfig {
  transform?: HttpTransform;
  requestOptions?: RequestOptions;
}

/**数据拦截和处理定义 */
export abstract class HttpTransform {
  /**请求前处理钩子*/
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**请求成功后对数据进行转换*/
  afterResponseHook?: (res: AxiosResponse<unknown>, options: RequestOptions) => any;

  /**请求失败处理*/
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**请求之前的拦截器*/
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**请求之后的拦截器*/
  responseInterceptor?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**请求之前的拦截器错误处理*/
  requestCatchInterceptor?: (error: Error, options: RequestOptions) => void;

  /**请求之后的拦截器错误处理*/
  responseCatchInterceptor?: (error: Error) => void;
}

export interface RequestOptions {
  apiPrefix?: string; // api通用前缀
  timeout?: number; // 超时时间
  noToken?: boolean; // 是否传token
  showSpin?: boolean; // 是否呈现loading效果
  showMsg?: boolean; // 是否弹出成功/失败消息
  showOkMsg?: boolean; // 是否弹出成功消息
  showFailMsg?: boolean; // 是否弹出失败消息
  okMsg?: string; // 自定义成功消息
  failMsg?: string; // 自定义失败消息
  onFail?: Function; // 请求未到服务端就失败时回调
}
