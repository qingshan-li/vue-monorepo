import { RequestOptions } from "./type";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "ant-design-vue";


//请求之前的拦截器
export function requestInterceptor(config: AxiosRequestConfig) {
  return config
}

// ----------------------------- 请求处理 --------------------------------
/**
 * 请求处理前
 * @param config
 * @returns
*/
export function beforeRequestHook(config: AxiosRequestConfig, options: RequestOptions) {
  const { noToken, showSpin } = options;

  /**请求需携带token*/
  if (!noToken) {
    // 自定义header
    config.headers = {
      ...config.headers,
      token: "xxxxx",
    }
    // 覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    // Authorization: "xxxx"
  }

  /**请求加载效果 */
  // if (showSpin) {
  //   if (actorId) spin(true, `#${actorId}-spin`);
  //   else spin(true);
  // }
  return config;
}

/**
 * 请求拦截器失败处理
 * @param config
 * @returns
 */
export function requestCatchInterceptor(error: unknown, options: RequestOptions) {
  const { showSpin, onFail } = options

  // if (showSpin) {
  //   if (actorId) spin(false, `#${actorId}-spin`);
  //   else spin(false);
  // }

  if (onFail) {
    onFail();
  }

  return Promise.reject(error);
}


// ----------------------------- 返回处理 --------------------------------

/**
 * 返回成功拦截器
 * @param config
 * @returns
 */
export function responseInterceptor(response: AxiosResponse<any>) {
  const { showSpin, actorId, showMsg, showOkMsg, showFailMsg, okMsg } = response?.config?.requestOption;

  /**取消加载效果*/
  // if (showSpin) {
  //   if (actorId) spin(false, `#${actorId}-spin`);
  //   else spin(false);
  // }

  /**判断状态做处理*/
  if (response.code) {
    return response;
  } else {
    return response;
  }
}

/**
 * 返回失败拦截器
 * @param config
 * @returns
 */
export function responseCatchInterceptor(error: any) {
  const { onFail, showMsg, showFailMsg, failMsg, noToken } = error?.response?.config?.RequestOptions;
  const payload = { msg: "", code: 0, type: "error", noToken };

  if (onFail) {
    onFail();
  }

  if (error.response) {
    switch (error.response.code) {
      case 400:
        message.error("请求错误")
        break;
      case 401:
        message.error("未授权，请重新登录(401)")
        break;
      case 403:
        message.error("无权限访问(403)")
        break;
      case 404:
        message.error("请求资源不存在(404)")
        break;
      case 500:
        message.error("服务器错误(500)")
        break;
      default:
        message.error(`请求失败${error.response.code}`);
        break;
    }
  }

  if (showFailMsg || showMsg || failMsg) {
    message.error(showFailMsg || showMsg || failMsg)
  }

  return Promise.reject(error);
}