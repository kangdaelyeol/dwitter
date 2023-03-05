import User from '../models/user.js';
import { existUserByCondition } from './dbfactory.js';
import { createUniqueId } from './factory.js';

/*
Method name: createUser
Description: 
  get body from the post method of a login form
  and check the required conditions for creating account
  and create user object and put it in the User Model
  and return the result as a boolean value
Returning value: Object{ result, description }
*/
export const createUser = (body) => {
	// Create Object to return it to the postLogin
	const result = {
		result: true,
		description: '',
	};

	// the values from login form
	// nickname, password, password2, id(Account Name)
	const { id, password, password2, nickname } = body;
	console.log(body);

	// check if it's valid the condition to create user
	// First: check whether if all required value exist
	if (!id || !password || !password2 || !nickname) {
		result.result = false;
		result.description = 'Something is not filled out!';
		return result;
	}

	// Second: check if the pw and pw2 are correct
	if (password !== password2) {
		result.result = false;
		result.description = 'Password is not filled out!';
		return result;
	}

	// Third: Check if the accountId is duplicated with others.
	if(existUserByCondition({accountId: id})){
		result.result = false;
		result.description = "account id is duplicated! fuck youy!"
		return result;
	}

	// Fourth: Create new Account -> means all conditions are right
	const uniqueId = createUniqueId();
	const newUser = {
		id: uniqueId,
		accountId: id,
		password,
		nickname,
		comments: [],
		profile: 'no images',
	};
	User[`${uniqueId}`] = { ...newUser, comments: [...newUser.comments] };
	return result;
};
