exports.up = function(knex, Promise) {
	return knex.schema.createTable('project_signup_board', (tbl) => {
		//Primary Key
		tbl.increments();

		//Foreign Key
		tbl
			.integer('project_id')
			.references('id')
			.inTable('projects')
			.onDelete('SET NULL');
		//Foreign Key
		tbl
			.integer('role_id')
			.references('id')
			.inTable('roles')
			.onDelete('SET NULL');
		//Foreign Key
		tbl
			.interger('user')
			.references('id')
			.inTable('users');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('project_signup_board');
};
