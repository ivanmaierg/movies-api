const express = require('express');
const app = express();
const { config } = require('./config/index');
const helmet = require("helmet");

// routes import
const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js');

// Handlers import
const { logErrors, errorHandler, wrapError } = require('./utils/middlewares/errorHandlers.js');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// Body Parser
app.use(express.json());

// helmet

app.use(helmet());


// Routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// Not found handler

app.use(notFoundHandler);
// Catch 404
app.use(logErrors);


// Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);



app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}/`)
})
