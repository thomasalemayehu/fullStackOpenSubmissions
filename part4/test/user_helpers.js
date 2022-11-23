const allUsers = [
	{ username: 'Abebe', password: 'estrongpassword' },
	{ username: 'Alemu', password: 'estrongpassword' },
	{ username: 'Henock', password: 'estrongpassword' },
];

const User = require('../models/user');

const getUsersInDB = async()=>{
	const users = await User.find({});
	return users;
};

module.exports = {allUsers,getUsersInDB};