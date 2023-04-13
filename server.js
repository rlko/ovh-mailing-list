const express = require('express');
const cors = require('cors');
const config = require('./config');
const OvhApiClient = require('./OvhApiClient');

const app = express();
app.use(cors());
ovh = new OvhApiClient();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/fake_mailing_lists', (req, res) => {
  res.send(["pokemon", "dev", "alerts", "banana", "monitoring","apt", "git", "ovh", "ff", "hr", "hunter", "kubo"]);
})

app.get('/mailing_lists', async (req, res) => {
  try {
      // Make the API call
      const { data } = await ovh.makeRequest(`/email/domain/${config.domain.name}/mailingList`);
      // Send the response
      res.send(data);
  } catch (error) {
      // Handle the error
      console.error('Request failed:', error);
      res.status(500).send('Request failed');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})