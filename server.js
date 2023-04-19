const express = require('express');
const cors = require('cors');
const config = require('./config');
const OvhApiClient = require('./OvhApiClient');
const {logger} = require("./back/logger/customLogger.js");

const app = express();
app.use(cors());
app.use(express.static('client/build'));


ovh = new OvhApiClient();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/mailing_lists', async (req, res) => {
  const noApiMode = (String(process.env.NOAPIMODE).toLowerCase() === 'true')
  if (noApiMode) {
    res.send(["pokemon", "dev", "alerts", "banana", "monitoring","apt", 
              "git", "ovh", "ff", "hr", "hunter", "kubo"
    ]);
    return;
  }

  try {
      // Make the API call
      const { data } = await ovh.makeRequest(`/email/domain/${config.ovh.domain.name}/mailingList`);
      // Send the response

      res.send(data);
  } catch (error) {
      // Handle the error
      logger.error('Request failed:', error);
      res.status(500).send('Request failed');
  }
});

app.listen(config.server.port, () => {
  console.log(`App listening on port ${config.server.port}`)
})