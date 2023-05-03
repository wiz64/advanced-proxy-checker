## advanced Proxy Checker
test proxies and get data from ipinfo.io
```js
//example.js

const proxyCheck = require('advanced-proxy-checker')
var proxy = "socks5://user:pass@proxy:port";
async function main() {
    var result = await (proxyCheck.test(proxy));
    console.log(result);
}
    main();

```
successful output: ()
```json
{
  valid: true,
  status: 'Connection Successful',
  data: {
    ip: '207.244.217.172',
    city: 'New York City',
    region: 'New York',
    country: 'US',
    loc: '40.7143,-74.0060',
    org: 'AS133944 Tesonet, UAB',
    postal: '10004',
    timezone: 'America/New_York',
    readme: 'https://ipinfo.io/missingauth'
  }
}
```
failed output : (valid will be false)
```json
{ status: 'Unknown Error', valid: false }
```
or
```json
{ status: 'Bad Gateway', valid: false }
```
