## Advanced Proxy Checker

Test proxies and find IP data like geolocation, fraudScore, whether the proxy is using a publically known datacenter or vpn ip, ASN/ISP Data.

### Full Method

```js
//example.js

const proxyCheck = require('advanced-proxy-checker')
var proxy = "socks5://user:pass@proxy:port";
async function main() {
    var result = await (proxyCheck.full(proxy));
    console.log(result);
}
    main();

```
successful output:
```js
{
  valid: true,
  status: 'Connection Successful',
  data: {
    ip: '45.155.68.XXX',
    city: 'Haarlem',
    region: 'North Holland',
    country: 'NL',
    loc: '52.3613,4.6464',
    org: 'AS60781 LeaseWeb Netherlands B.V.',
    postal: '2034',
    timezone: 'Europe/Amsterdam',
    asn: {
      asn: 'AS60781',
      name: 'LeaseWeb Netherlands B.V.',
      domain: 'leaseweb.com',
      route: '45.155.68.0/24',
      type: 'hosting'
    },
    company: {
      name: 'RapidSeedbox Ltd',
      domain: 'rapidseedbox.com',
      type: 'business'
    },
    privacy: {
      vpn: false,
      proxy: false,
      tor: false,
      relay: false,
      hosting: false,
      service: ''
    },
    abuse: {
      address: 'Haim Toran 28 On 6, Jerusalem, ISRAEL',
      country: 'NL',
      email: 'ip@rapidseedbox.com',
      name: 'Abuse-C Role',
      network: '45.155.68.0/24',
      phone: ''
    },
    fraudScore: 66,
    riskLevel: 'high'
  }
}
```
failed output : (valid will be false)
```js
{ status: 'Unknown Error', valid: false }
```
or
```js
{ status: 'Bad Gateway', valid: false }
```

## All Methods
- full

returns ip geo data, asn and privacy data as well as fraudScore, riskLevel
```js
await proxyCheck.full(proxy);
```

- test

returns only ip as a quick test
```js
await proxyCheck.test(proxy);
```

- info

returns ip geo data, asn and privacy 
```js
await proxyCheck.info(proxy);
```

- getScore

returs fraudscore and risk level
```js
await proxyCheck.getScore(proxy);
```