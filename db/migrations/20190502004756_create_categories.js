exports.up = function(knex, Promise) {
	return knex.schema.createTable('categories', (tbl) => {
		//Primary Key - Table id
		tbl.increments();
		//Categories Title
		tbl
			.string('title', 128)
			.notNullable()
			.unique();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('categories');
};
