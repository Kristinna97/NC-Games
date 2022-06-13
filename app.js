const express = require("express");
const cors = require('cors');
 
const { handlePSQLErrors,
        handleCustomError}  = require('./controllers/errors-controller') 
const apiRouter = require('./routes/api-router');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api' , apiRouter)


app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(handlePSQLErrors);

app.use(handleCustomError);

module.exports = app;
