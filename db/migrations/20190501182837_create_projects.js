exports.up = function(knex, Promise) {
	return knex.schema.createTable('projects', function(tbl) {
		//Primary Key - project 'id'
		tbl.increments();

		//Foreign Key
		tbl
			.integer('user_id')
			.references('id')
			.inTable('users')
			.onDelete('SET NULL');

		//Foreign Key
		/* tbl
			.integer('categories_id')
			.unsigned()
			.references('id')
			.inTable('categories'); */

		//Project Columns
		tbl.string('project_title', 128).notNullable();
		//Details
		tbl.string('project_details', 500).notNullable();
		//MVP
		tbl.string('mvp', 500).notNullable();
		//Stretch
		tbl.string('stretch', 500).notNullable();
		//Roles
		tbl.specificType('roles', 'INT[]');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('projects');
};
