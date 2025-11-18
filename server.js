// server.js
require('dotenv').config();
const connectDB = require("./src/db");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const constants = require('./src/utils/constants');
const requestLogger = require("./src/middlewares/requestLogger");

const app = express();
const port = process.env.PORT || constants.PORT;

(async () => {
  await connectDB();
})();

const routes = require('./src/routes/routes');

// CORS
app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Log every request
app.use(requestLogger);

// Routes
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  res.status(constants.HTTP_400).send({ url: req.originalUrl + ' not found' });
});

// Start server
app.listen(port);
console.log('RESTful API server started on: ' + port);
