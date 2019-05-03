require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../dbConfig');

const { authenticate, generateToken } = require('../auth/authenticate.js');

module.exports = (server) => {
	server.get('/', sanityCheck); //Sanity Check

	//users
	server.post('/api/register', register); //register a new user
	server.post('/api/login', login); //login a user
	server.delete('/api/removeuser/:id', authenticate, deleteUser); //delete a user
	server.put('./api/updateuser/:id', authenticate, updateUser); //update a user

	//projects
	server.get('/api/allprojects', authenticate, getAllProjects);
	server.get('/api/allprojects/:id', authenticate, getAllProjectsById);
	server.get('/api/projects', getProjects);
	server.get('/api/projects/:id', getProjectsById);
	server.post('/api/project', project); //Add new project
	server.delete('/api/deleteproject/:id', authenticate, deleteProject);
	server.put('/api/updateproject/:id', authenticate, updateProject);

	//roles
	server.get('/api/allroles', authenticate, getAllProjects);
	server.get('/api/allprojects', authenticate, getAllProjectsById);
	server.get('/api/projects', getProjects);
	server.get('/api/projects/:id', getProjectsById);
	//categories
	server.post('/api/category', category);
	server.delete('/api/deletecategory/:id', authenticate, deleteCategory);

	///assignment
	server.post('/api/assignment', assingment);
	server.delete('/api/assignment/:id', authenticate, assingment);
};

//Main Page Route - Sanity Check As Well
function sanityCheck(req, res) {
	res.send('AVENGERS ASSEMBLE.....');
}

//Registration
function register(req, res) {
	const userInfo = req.body;
	const hash = bcrypt.hashSync(userInfo.password, 12);
	userInfo.password = hash;

	db('users')
		.insert(userInfo)
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => res.status(500).json(err));
}

//Login
function login(req, res) {
	const creds = req.body;

	db('users')
		.where({ username: creds.username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					loggedInAs: `${user.username}`,
					token,
				});
			} else {
				res.status(401).json({
					message: 'Incorrect username or password',
				});
			}
		})
		.catch((err) => res.status(500).json(err));
}

// Delete a user
function deleteUser(req, res) {
	const id = req.params.id;

	db('users')
		.where({ id: id })
		.delete()
		.then((thing) => {
			res.status(200).json();
		})
		.catch((err) => res.status(500).json(err));
}

// Update a user
function updateUser(req, res) {
	const id = req.params.id;

	db('users')
		.where({ id: id })
		.update(req.body)
		.then(() => {
			res.status(200).json();
		})
		.catch((err) => res.status(500).json(err));
}

// Protected route to get all projects
function getAllprojects(req, res) {
	db('projects')
		.then((projects) => {
			res.status(201).json(projects);
		})
		.catch((err) =>
			res.status(500).json({ message: 'Database error', error: err })
		);
}

// Protected route to get a project behind a protected route
function getAllProjectsById(req, res) {
	const id = req.params.id;

	db('projects')
		.where({ id: id })
		.first()
		.then((projects) => {
			res.status(201).json(projects);
		})
		.catch((err) =>
			res.status(500).json({ message: 'Database error', error: err })
		);
}

// Public route to get approved projects
function getProjects(req, res) {
	db('projects')
		.where({ id: 1 })
		.then((projects) => {
			res.status(201).json(projects);
		})
		.catch((err) =>
			res.status(500).json({ message: 'Database error', error: err })
		);
}

// Public route to get an approved project by an ID
function getProjectsById(req, res) {
	const id = req.params.id;

	db('projects')
		.where()
		.first()
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) =>
			res.status(500).json({ message: 'Database error', error: err })
		);
}

// Add a new project
function project(req, res) {
	let project = req.body;

	db('projects')
		.insert(project)
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => res.status(500).json(err));
}

// Delete a project
function deleteProject(req, res) {
	const id = req.params.id;

	db('projects')
		.where({ id: id })
		.delete()
		.then((thing) => {
			res.status(200).json(thing);
		})
		.catch((err) => res.status(500).json(err));
}

// Update a project
function updateProject(req, res) {
	const id = req.params.id;
	userId = req.decoded.id;
	req.body.approved_by_user_id = userId;

	db('projects')
		.where({ id: id })
		.update(req.body)
		.then((thing) => {
			res.status(200).json(thing);
		})
		.catch((err) => res.status(500).json(err));
}

// Add a category
function category(req, res) {
	let category = req.body;
	category.approved = 0;
	category.snippet = '';

	db('categoriess')
		.insert(category)
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => res.status(500).json(err));
}
