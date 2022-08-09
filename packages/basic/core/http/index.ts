import { HttpTransform, RequestOptions } from "./type";
import Http from "./Http"
import {
  requestInterceptor,
  beforeRequestHook,
  requestCatchInterceptor,
  responseInterceptor,
  responseCatchInterceptor
} from "./requestHook"

/**
 * 数据转换
*/
const transform: HttpTransform = {
  requestInterceptor,
  beforeRequestHook,
  requestCatchInterceptor,
  responseInterceptor,
  responseCatchInterceptor
}

let http: Http;

function createHttp(baseUrl: string, requestOptions: RequestOptions) {
  const baseURL = requestOptions.apiPrefix ? `${baseUrl}/${requestOptions.apiPrefix}/` : baseUrl;
  http = new Http({ transform, requestOptions, baseURL })
}

export { http, createHttp };