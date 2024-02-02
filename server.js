const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

const envelopesRouter = require('./routes/envelopes-router');
app.use('/envelopes', envelopesRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port 3000...');
});
