exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('project_role_assignments')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('project_role_assignments').insert([
				{ id: 1, colName: 'rowValue1' },
				{ id: 2, colName: 'rowValue2' },
				{ id: 3, colName: 'rowValue3' },
			]);
		});
};
