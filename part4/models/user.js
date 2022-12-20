const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: [true, 'Username {VALUE} already in use'],
		required: [true, 'Username is required'],
		minLength: [3, 'Username should be at least 3 characters'],
	},

	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog',
	}],
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Comment',
	}]
});



// userSchema.pre('save', async function (next) {
// 	try{
// 		this.password = bcrypt.hashSync(this.password, 4);
// 	}catch(e){
// 		console.log(e);
// 		next(e);
// 	}
// });

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.password;
	},
});


const User = mongoose.model('User',userSchema);

module.exports = User;