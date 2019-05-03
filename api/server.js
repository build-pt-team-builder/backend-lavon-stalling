//Load environment variables
require('dotenv').config();

//import node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const configureRoutes = require('../config/routes.js');

//Import error handling
const { errorHandler } = require('./config/middleware/errorHandler.js');

//Create express server
const server = express();

//Secure and hide HTTP headers
server.use(helmet());

//Builtin that recognizes the incoming data object as a JSON Object
server.use(app.use(express.json()));

//Logs request details
server.use(morgan('dev'));

//Handles cross domain requests
server.use(cors());

//Routes in API
configureRoutes(server);

/*********************************************************/
/********************** ROUTES ***************************/
/********************************************************/

/* //Main Page Route - Sanity Check As Well
server.get('/', async (req, res) => {
	res.send(`AVENGERS ASSEMBLE.....`);
}); */

/* //Constants for Routes/Endpoints JS files found in routes directory
const {
	authRouter,
	projectsRouter,
	categoriesRouter,
	rolesRouter,
	usersRouter,
	projectRolesRouter,
	testRouter,
} = require('./routes/index.js');

const usersRouter = require('./routes/users/usersRouter');
const projectsRouter = require('./routes/projects/projectsRouter');
const authRouter = require('./routes/auth/authRouter');

//Authorization Route
server.use('/auth', authRouter);
//Projects Route
server.use('/api/projects', projectsRouter);
server.use('/api/projects-roles', projectRolesRouter);
//Categories/groups Route
server.use('/api/categories', categoriesRouter);
//Roles Route
server.use('/api/roles', rolesRouter);
//Users Route
server.use('/api/users', usersRouter);
//Tests Routes
server.use('/api/tests', testRouter);
//Error Handler
server.use(errorHandler); */

//Export
module.exports = server;
