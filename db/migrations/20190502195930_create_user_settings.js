exports.up = function(knex, Promise) {
	return knex.schema.createTable('user_settings', function(tbl) {
		//Primary Key
		tbl.increments();

		tbl
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');

		tbl.string('app_start_page', 66);

		tbl.string('app_theme', 66);

		tbl.integer('projects_per_page');
		tbl.string('projects_status_sort');
		tbl.integer('users_per_page');
		tbl.boolean('users_show_email');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('user_settings');
};
