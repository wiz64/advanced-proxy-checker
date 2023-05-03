const http = require('http');
const ProxyAgent = require('proxy-agent');

async function test(proxy) {
  const proxyUri = proxy;
  const agent = new ProxyAgent(proxyUri);

  const options = {
    method: 'GET',
    host: 'ipinfo.io',
    path: '/',
    agent: agent,
  };

  const result = await new Promise((resolve, reject) => {
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
      resolve({statusCode:true})
    });

    req.end();
  });
  var response = {};
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
  if(!response.valid) {response.valid = false}

  return response;
}

module.exports.test = test;
