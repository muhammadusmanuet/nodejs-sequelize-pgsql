var express = require('express');
const { sequelize } = require('./models');
const routes = require("./routes");
const { rateLimiter } = require('./middlewares');
var app = express();

// Apply the rate limiting middleware to all requests
app.use(rateLimiter)

// load routes
routes(app)

app.listen(3000, async () => {
  console.log('Server running on port 3000')
  await sequelize.authenticate()
  console.log("Databse Connected!")
});