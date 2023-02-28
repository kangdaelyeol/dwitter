import { createUser } from '../controllers/logincontroller.js';
import User from '../models/user.js';

export const getLogin = (req, res, next) => {
	res.render('login');
};

export const postLogin = (req, res, next) => {
	const body = req.body;

	// create User sequence
	const result = createUser(body);
	if (result.result === true) {
		console.log(User);
		res.redirect('/');
	} else {
		console.log('false', result.description);
		res.redirect("/login");
	}
};
