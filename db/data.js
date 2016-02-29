var faker = require('faker');

const MaxUsers = 1000;

module.exports.generate = function(users, profiles){
	for(var i=0;i<MaxUsers;i++){
		var fname = faker.name.firstName();
		var lname = faker.name.lastName();

		var user = {
			id: faker.random.uuid()+"|fb",
			username: faker.internet.email(), 
			password: faker.internet.password()
		};
		var profile = {
			id: user.id, 
			username: user.username,
			name: fname + " " + lname,
			fist_name: fname, 
			last_name: lname,
			middle_name: "",
			gender: faker.random.arrayElement(["male","female"]),
			email: user.username, 
			link: faker.internet.url()
		};


		users.insert(user);
		profiles.insert(profile);
	}
}