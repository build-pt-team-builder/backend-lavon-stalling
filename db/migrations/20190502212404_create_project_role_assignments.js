export function up(knex, Promise) {
	return knex.schema.createTable('projects_role_assignments', (tbl) => {
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
		//Role Filled -  User Assigned - Foreign Key
		tbl
			.interger('user_assignment')
			.references('id')
			.inTable('users');
	});
}

export function down(knex, Promise) {
	return knex.schema.dropTableIfExists('project_role_assignments');
}
