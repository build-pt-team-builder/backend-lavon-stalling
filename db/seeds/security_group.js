exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('security_group')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('security_group').insert([{ id: 1 }, { id: 2 }, { id: 3 }]);
		});
};
