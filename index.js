const connect = require('./connect');
const fraudScore = require('./fraud_score')
async function full(proxy) {
    var [score, info] = await Promise.all([this.getScore(proxy), this.info(proxy)]);
    info.data = {...info.data, ...score.data};
    return info;
  }
module.exports.getScore = fraudScore.getScore;
module.exports.info = connect.info;
module.exports.test = connect.test;
module.exports.full= full;