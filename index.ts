import TestFunctions from './connect';
import { Result } from './types';
const ProxyAgent = require('proxy-agent');
const http = require('https');
export default class ProxyClient extends TestFunctions {
  async full(proxy: string) {
    const [score, info] = await Promise.all([this.getScore(proxy), this.info(proxy)]);
    info.data = { ...info.data, ...score.data };
    return info;
  }
  async getScore(proxy:string) {
    var data = await this.test(proxy);
    if (data.valid == true) {
        if(data.data.ip) {
        const proxyUri = proxy;
        const agent = new ProxyAgent(proxyUri);
      
        const options = {
            hostname: 'scamalytics.com',
            port: 443,
            agent: agent,
            rejectUnauthorized: false,
            path: '/ip/'+data.data.ip,
            method: 'GET'
          };
      
        const result:Result = await new Promise((resolve, reject) => {
          const req = http.get(options, (res:any) => {
            const statusCode = res.statusCode;
           
            let data = '';
      
            res.on('data', (chunk:any) => {
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
      
          req.on('error', (err:any) => {
            console.log(err)
            resolve({statusCode:true})
          });
      
          req.end();
        });
        var response:Result = {
          valid: false,
          status: '',
          data: undefined
        };
        switch (result.statusCode) {
          case 200:
            response.valid = true;
            response.status = 'Connection Successful';
            const html = result.data;
    
            const ipAddressRegex = /"ip":"([\d.]+)"/;
            const fraudScoreRegex = /"score":"(\d+)"/;
            const riskLevelRegex = /"risk":"(\w+)"/;
                    const ipAddressMatch = html.match(ipAddressRegex);
                    const fraudScoreMatch = html.match(fraudScoreRegex);
                    const riskLevelMatch = html.match(riskLevelRegex);
                    const extractedData = {
                    ip: ipAddressMatch ? ipAddressMatch[1] : null,
                    fraudScore: fraudScoreMatch ? parseInt(fraudScoreMatch[1]) : null,
                    riskLevel: riskLevelMatch ? riskLevelMatch[1] : null,
                    };
            response.data = extractedData;
            break;
          case 401:
            response.status = 'Authentication Invalid';
            break;
          case 403:
            response.status = 'Authentication Failed';
            break;
            case 302:
            response.status = 'Redirected';
            break;
          case 502:
            response.status = 'Bad Gateway';
            break;
          default:
            response.status = 'Connection Error';
            break;
        }
        if(!response.valid) {response.valid = false}
      
        return response;
      }
    
        } else return data;
    }
}
