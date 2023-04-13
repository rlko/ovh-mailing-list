const crypto = require('crypto');
const config = require('./config');
const axios = require('axios').default;

class OvhApiClient {
  constructor() {
    this.baseApiUrl = "https://eu.api.ovh.com/1.0"
    this.apiKey = config.domain.api.key;
    this.apiSecret = config.domain.api.secret;
    this.apiCustomerKey = config.domain.api.ck;
  };

  signRequest = (httpMethod, url, body, timestamp) => {
    const hash = crypto.createHash('sha1');
    const signRawStr = `${this.apiSecret}+${this.apiCustomerKey}+${httpMethod}+${url}+${body}+${timestamp}`;
    hash.update(signRawStr);
    return ('$1$' + hash.digest('hex'));
  };

  async makeRequest(endpoint, method = 'GET', body = '') {
    const url = `${this.baseApiUrl}${endpoint}`;
    const timestamp =  Math.floor(Date.now() / 1000);
    const requestConfig = {
      headers: {
          'Content-Type': 'application/json',
          'X-Ovh-Application': this.apiKey,
          'X-Ovh-Timestamp': timestamp,
          'X-Ovh-Signature': this.signRequest(method, url, body, timestamp),
          'X-Ovh-Consumer': this.apiCustomerKey,
      },
    };
    return (axios.get(url, requestConfig));
  };
}

module.exports = OvhApiClient;