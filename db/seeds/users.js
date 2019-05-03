const faker = require('faker');
const bcrypt = require('bcryptjs');

const createFakeUser = () => {
	let fakeUsers = [];
	const desiredFakeUsers = 100;
	for (let i = 0; i < desiredFakeUsers; i++) {
		fakeUsers.push({
			username: faker.internet.userName(),
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			email: faker.internet.email(),
			admin: 'F',
			password: 'password',
		});
	}
	fakeUsers.push({
		username: 'bruiser',
		first_name: 'lavon',
		last_name: 'stalling',
		email: 'fake@fakemail.com',
		admin: 'T',
		password: 'password',
	});
	/* exports.seed = function(knex, Promise) {
	//Users
	let fakeUsers = [];
	const desiredFakeUsers = 100;
	for (let i = 1; i < desiredFakeUsers; i++) {
		fakeUsers.push(createFakeUser());
	}
	knex('users').insert(fakeUsers);
};

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert(createFakeUser());
		});
}; */
	return fakeUsers;
};
exports.seed = function(knex, Promise) {
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert(createFakeUser());
		});
};
