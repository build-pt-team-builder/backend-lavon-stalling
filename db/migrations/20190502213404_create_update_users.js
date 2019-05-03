exports.up = function(knex, Promise) {
	return knex.schema.table('users', function(tbl) {
		tbl
			.integer('security_group')
			.references('id')
			.inTable('security_group');

		tbl.string('cohort');

		tbl.int('project_manager');
		tbl.int('preferred_role');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('users', function(tbl) {
		tbl.dropColumn('cohort');
		tbl.dropColumn('project_manager');
		tbl.dropColumn('preferred_role');
	});
};
