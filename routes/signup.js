import { createUser } from '../controllers/signupcontroller.js';
import User from '../models/user.js';

export const getSignup = (req, res, next) => {
	res.render('signup');
};

export const postSignup = (req, res, next) => {
	const body = req.body;

	// create User sequence
	const result = createUser(body);
	if (result.result === true) {
		console.log(User);
		res.redirect('/');
	} else {
		console.log('false', result.description);
		res.redirect("/signin");
	}
};
