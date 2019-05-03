exports.up = function(knex, Promise) {
	return knex.schema.createTable('roles', (tbl) => {
		//Primary Key
		tbl.increments('role_id');

		//Name of Role
		tbl.string('role_name', 128).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExist('roles');
};
