import { isFunction } from "lodash_es"
import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { resolveComponent } from "vue";
import { CreateHttpOptions, RequestOptions } from "./type";


export default class Http {
  // axios实例
  private readonly instance: AxiosInstance
  // 基础配置项
  private readonly options

  constructor(options) {
    this.options = options;
    this.instance = axios.create(options);
    this.setupInterceptors();
  }

  /**拦截器，对请求参数和响应结果进行拦截处理*/
  private setupInterceptors() {
    const transform = this.options.transform;
    const {
      requestInterceptor,
      requestCatchInterceptor,
      responseInterceptor,
      responseCatchInterceptor,
    } = transform;

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 请求前的拦截器钩子
        if (isFunction(requestInterceptor)) {
          config = requestInterceptor(config)
        }
        return config;
      },
      (error) => {
        // 请求前的拦截器错误处理
        if (isFunction(requestCatchInterceptor)) {
          requestCatchInterceptor(error, this.options.requestOptions);
        }
      }
    )

    // 返回值拦截器
    this.instance.interceptors.response.use(
      (response) => {
        //请求之后的拦截器
        if (isFunction(responseInterceptor)) {
          response = responseInterceptor(response);
        }
        return response;
      },
      (error) => {
        //请求之后的拦截器错误处理
        if (isFunction(responseCatchInterceptor)) {
          responseCatchInterceptor(error)
        }
      }
    )
  }

  /**get 方法*/
  get<T = unknown>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, url, method: "GET" }, options)
  }

  /**post 方法*/
  post<T = unknown>(url: string, data: T, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, url, data, method: "POST" }, options)
  }

  /**put 方法*/
  put<T = unknown>(url: string, data: T, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, url, data, method: "PUT" }, options)
  }

  /**delete 方法*/
  delete<T = unknown>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, url, method: "DELETE" }, options);
  }

  /**request 方法*/
  request<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // 合并调用时的请求配置和默认配置
    let conf: CreateHttpOptions = Object.assign({}, this.options, config);

    console.log("http--this.options", this.options, options)

    const { transform, RequestOptions } = this.options;

    // 合并自定义配置
    const opt: RequestOptions = Object.assign({}, RequestOptions, options);

    const { beforeRequestHook, requestCatchHook, afterResponseHook } = transform || {};

    // 判断是否有相应的钩子函数，有的话做私有处理-请求前处理钩子
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }

    conf.requestOptions = opt;

    return new Promise((resolve, reject) => {
      this.instance
        //实例发起请求
        .request<unknown, AxiosResponse<unknown>>(conf)
        //返回值
        .then((res: AxiosResponse<unknown>) => {
          // 判断是否有相应的钩子函数，有的话做私有处理-对数据进行转换
          if (afterResponseHook && isFunction(afterResponseHook)) {
            try {
              const ret = afterResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          // 可以自行根据返回的格式做提示
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          // 判断是否有相应的钩子函数，有的话做私有处理-请求失败处理
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }

          reject(e);
        })
    })
  }
}