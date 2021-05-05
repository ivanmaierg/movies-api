const express = require('express');
const app = express();
const { config } = require('./config/index');
const helmet = require("helmet");
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js');
const { logErrors, errorHandler, wrapError } = require('./utils/middlewares/errorHandlers.js');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// Body Parser
app.use(express.json());

// helmet

app.use(helmet());


// Routes
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
    console.log(`Listening http://localhost:${config.port}`)
})
