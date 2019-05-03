//Environment variables loaded from the .env file
require('dotenv').config();

//Import server library
const { server } = require('./api/server.js');

//Assign port
const port = process.env.PORT || 3300;

//Listener created at specified port
server.listen(port, () => {
	console.log(`\n=== Server listening on http://localhost:${port} ===\n`);
});
