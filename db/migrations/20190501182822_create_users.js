exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (tbl) => {
		//Primary Key
		tbl.increments();

		//Username
		tbl
			.string('username', 66)
			.notNullable()
			.unique();
		//First Name
		tbl.string('first_name', 66).notNullable();
		//Last Name
		tbl.string('last_name', 66).notNullable();
		//Email
		tbl
			.string('email', 128)
			.unique()
			.notNullable();
		//Admin Boolean
		tbl.boolean('admin', 1).notNullable();
		//Password
		tbl.string('password', 66);
		//Created at Date
		tbl.timestamp('created_at').defaultTo(knex.fn.now());
		//Updated Date
		tbl.timestamp('updated_at').defaultTo(knex.fn.now());
		//Last Login
		tbl.timestamp('last_login').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
