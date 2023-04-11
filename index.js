const express = require('express');
const axios = require('axios').default;
const fs = require('fs');
const yaml = require('js-yaml');
const crypto = require('crypto');

const app = express();
const port = 3000;
let config;

// Function to sign the request
const signRequest = (httpMethod, url, body, timestamp) => {
  const hash = crypto.createHash('sha1');
  const signRawStr = `${config.domain.api.secret}+${config.domain.api.ck}+${httpMethod}+${url}+${body}+${timestamp}`;
  hash.update(signRawStr);
  return '$1$' + hash.digest('hex');
};

// Set the default headers for all Axios requests
const setDefaultHeader = () => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

const setup = ()=> {
  const ovhConfPath = './ovh.yml';
  const ovhConfig = fs.readFileSync(ovhConfPath, 'utf8');

  config = yaml.load(ovhConfig);

  setDefaultHeader();
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/mailing_lists', async (req, res) => {
  const URL = `https://eu.api.ovh.com/1.0/email/domain/${config.domain.name}/mailingList`;

  // Timestamp for request signing
  const timestamp = Math.floor(Date.now() / 1000);

    // Request configuration
  const requestConfig = {
    headers: {
        'X-Ovh-Application': config.domain.api.key,
        'X-Ovh-Timestamp': timestamp,
        'X-Ovh-Signature': signRequest('GET', URL, '', timestamp),
        'X-Ovh-Consumer': config.domain.api.ck,
    },
  };

  try {
      // Make the API call
      const { data } = await axios.get(URL, requestConfig);

      // Send the response
      res.send('GET worked!: ' + JSON.stringify(data));
  } catch (error) {
      // Handle the error
      console.error('Request failed:', error);
      res.status(500).send('Request failed');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  setup();
})