import { METHODS } from '../types/methods.enum.ts';

type TDate = {
    [key: string]: any;
}

type TOptions = {
    headers: string;
    data: TDate;
    method: METHODS;
    timeout: number
}

type TRequestMethod = (url: string, options: TOptions) => Promise<unknown>

interface IHTTPTransport<T> {
    get: T;
    delete: T;
    put: T;
    post: T;
}

function queryStringify(data: TDate) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport implements IHTTPTransport<TRequestMethod> {
  get = (url: string, options: TOptions) => {
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  delete = (url: string, options: TOptions) => {
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  put = (url: string, options: TOptions) => {
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: TOptions) => {
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  private request = (url: string, options: TOptions, timeout = 5000) => {
    const { data, method, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        const searchParams = queryStringify(data);
        const wholeUrl = `${url}${searchParams}`;
        xhr.open(method, wholeUrl);
      } else {
        xhr.open(method, url);
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

const transport = new HTTPTransport();

export default transport;
