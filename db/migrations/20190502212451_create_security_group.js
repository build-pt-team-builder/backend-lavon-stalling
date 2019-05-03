exports.up = function(knex, Promise) {
	return knex.schema.createTable('security_group', (tbl) => {
		//Primary Key
		tbl.increments();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('security_group');
};
