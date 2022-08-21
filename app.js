const express = require('express');
const bodyparser = require('body-parser');
const route = require('./Routes/routing');
const myReqLogger = require('./Utilities/requestLogger');
const myErrLogger = require('./Utilities/errorLogger');
const cors = require('cors');

const app = express();
app.use(cors({
  'Access-Control-Allow-Origin': '*'
}));
app.use(bodyparser.json());
app.use(myReqLogger);
app.use('/', route);
app.use(myErrLogger);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
