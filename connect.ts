import * as  http from 'http';
import ProxyAgent from 'proxy-agent';
import { Options, Result } from './types';
export default class TestFunctions {
  protected async test(proxy: string): Promise<any> {
    const proxyUri = proxy;
    const agent = new ProxyAgent(proxyUri);

    const options: Options = {
      method: 'GET',
      host: 'api.ipify.org',
      path: '/?format=json',
      agent: agent,
    };

    const result: Result = await new Promise((resolve, reject) => {
      const req = http.get(options, res => {
        const statusCode = res.statusCode;

        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          var response = {
            valid: false,
            status: '',
            statusCode: statusCode,
            data: data
          };

          resolve(response);
        });
      });

      req.on('error', err => {
        resolve({ statusCode: 403 })
      });

      req.end();
    });
    var response: Result = {
      valid: false,
      status: '',
      statusCode: '',
      data: undefined
    };
    switch (result.statusCode) {
      case 200:
        response.valid = true;
        response.status = 'Connection Successful';
        response.data = JSON.parse(result.data);
        break;
      case 401:
        response.status = 'Authentication Invalid';
        break;
      case 403:
        response.status = 'Authentication Failed';
        break;
      case 502:
        response.status = 'Bad Gateway';
        break;
      default:
        response.status = 'Connection Error';
        break;
    }
    if (!response.valid) { response.valid = false }

    return response;
  }

  protected async info(proxy: string) {
    var data = await this.test(proxy);
    if (data.valid == true) {

      {
        const proxyUri = proxy;
        const agent = new ProxyAgent(proxyUri);

        const options: Options = {
          hostname: 'ipinfo.io',
          path: '/widget/demo/' + data.data.ip,
          agent: agent,
          headers: {
            'authority': 'ipinfo.io',
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'cookie': 'flash=',
            'dnt': '1',
            'pragma': 'no-cache',
            'referer': 'https://ipinfo.io/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.1 Safari/537.36'
          },
          method: 'GET'
        };

        const result: Result = await new Promise((resolve, reject) => {
          const req = http.get(options, res => {
            const statusCode = res.statusCode;
            const headers = res.headers;
            let data = '';

            res.on('data', chunk => {
              data += chunk;
            });

            res.on('end', () => {
              var response = {
                valid: false,
                status: '',
                statusCode: statusCode,
                data: data
              };

              resolve(response);
            });
          });

          req.on('error', err => {
            resolve({ statusCode: true })
          });

          req.end();
        });
        var response: Result = {
          valid: false,
          status: '',
          statusCode: '',
          data: ''
        };
        switch (result.statusCode) {
          case 429:
            response.valid = false;
            response.status = "rateLimited";
            break;
          case 200:
            response.valid = true;
            response.status = 'Connection Successful';
            response.data = JSON.parse(result.data);
            break;
          case 401:
            response.status = 'Authentication Invalid';
            break;
          case 403:
            response.status = 'Authentication Failed';
            break;
          case 502:
            response.status = 'Bad Gateway';
            break;
          default:
            response.status = 'Connection Error';
            break;
        }
        if (!response.valid) { response.valid = false }
        if (response.data && response.data.data) { response.data = response.data.data }
        return (response);
      }

    }
    else return data;

  }
}
