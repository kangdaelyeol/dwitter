import Users from '../models/user.js';
import Comments from '../models/comment.js';
import { createUniqueId } from './factory.js';

// this is the file for DB schema including method for CRUD method

/* get accountId of User Schema
   and Check if it exists
   return Boolean variables.
*/
export const existUserById = (id) => {
	console.log('existUserByID', id);
	const everyCB = (key) => {
		const uacid = Users[key].accountId;
		if (uacid === id) return true;
		return false;
	};
	const result = Object.keys(Users).some(everyCB);

	return result;
};

// check if it exist that is matchted with the condition(Objects) whtch
// have to be allocated the key that the User model has.

export const existUserByCondition = (cond) => {
	const key = Object.keys(cond)[0];
	const value = cond[`${key}`];
	const result = Object.keys(Users).some((k) => {
		return Users[`${k}`][`${key}`] === value;
	});
	return result;
};

// return value: false -> boolean, true -> Object (user)
// receiving param -> id(accoundId)
export const findUserById = (id) => {
	const result = Object.keys(Users).find((key) => {
		const uacid = Users[key].accountId;
		if (uacid === id) return true;
		return false;
	});

	if (!result) return false;

	// the value of result is uniqueId
	const user = {
		...Users[`${result}`],
		comments: [...Users[`${result}`].comments],
	};

	return user;
};

export const getUserById = (id) => {
	const result = Object.keys(Users).find((key) => {
		const uid = Users[key].id;
		if (uid === Number(id)) return true;
		return false;
	});

	if (!result) return false;

	// the value of result is uniqueId
	const user = {
		...Users[`${result}`],
		comments: [...Users[`${result}`].comments],
	};

	return user;
};

// it's for the createComment Function,
// because when a comment obj is created, the information has to be added to the userInfo,
// in the comments Array.
const putCommentIdInfoToTheUser = (commentId, userId) => {
	Users[`${userId}`].comments.push(commentId);
	console.log(Users, 'created', userId, commentId);
};

export const createComment = (content, owner) => {
	const id = createUniqueId();
	const createAt = Date.now();
	const comment = {
		id,
		content,
		createAt,
		owner,
	};

	Comments[`${id}`] = {
		...comment,
	};

	// also have to comments id information in the USER DB's the user
	putCommentIdInfoToTheUser(id, owner);
};

/** functionName: getComments
 * it can return comments informaiton
 * the param, userID value, is an option
 * if you don't put value in the param, it will return all informaitons
 * but if the param is filled out,
 * it will return comments information that the owner's own.
 */
export const getComments = (userId) => {
	// the comments will be returned with "deep cooy" process.

	const newComments = {};

	// when userId isn't given
	if (!userId) {
		Object.keys(Comments).forEach((key) => {
			const comment = {
				...Comments[`${key}`],
			};
			newComments[`${key}`] = comment;
		});
	} else {
		// when userId is given -> use Filter
		Object.keys(Comments).forEach((key) => {
			// the userId(unique Numner) must be 'owner' property
			const userIdOfComment = Comments[`${key}`].owner;
			if (Number(userId) !== Number(userIdOfComment)) return;
			else {
				const comment = {
					...Comments[`${key}`],
				};
				newComments[`${key}`] = comment;
			}
		});
	}

	return newComments;
};

/** function: populateComments
 *  description: it's about the function for "comments" model,
 * in order for the owner(uniqueId) to be changed into User information,
 * it has to be progressed in the dbfactory.js to get Users model
 * required params: comments (D_Model)
 * returning value: comments poplated with users
 */

/* comments schema
  id: String (Unique)
  content: String
  createdAt: number (Date.now())
    -> have to make the function that show the current moment directly seperately
  owner: String (ref:user)
*/

// it's a function for populateComments
// , searching the corresponding user data according to uniqueId
const findUserByUniqueId = (id) => {
	const result = Object.keys(Users).find((key) => {
		const uacid = key;
		if (String(uacid) === String(id)) return true;
		return false;
	});

	if (!result) return false;

	// the value of result is uniqueId
	const user = {
		...Users[`${result}`],
		comments: [...Users[`${result}`].comments],
	};

	return user;
};

export const populateComments = (comments) => {
	const newComments = {}; // return value

	// do deep-copy comments

	Object.keys(comments).forEach((k) => {
		newComments[`${k}`] = {
			...comments[`${k}`],
		};

		// change owner value to the corresponding user data accroding to the id value.
		// make the most of findUserById(containing deep-copy)

		const ownerValue = newComments[`${k}`].owner; // uniqueID
		newComments[`${k}`].owner = findUserByUniqueId(ownerValue);
	});

	return newComments;
};

/** function: getCommentById
 * description: get uniqueId and search the comment data according to the id value.
 * if the corresponding Comment data doesn't exist, gonna return false.
 */
export const getCommentById = (id) => {
	let result = false;
	Object.keys(Comments).forEach((k) => {
		if (String(id) === k) result = { ...Comments[`${k}`] };
	});

	return result;
};

/**function: deleteCommentById
 * description: delete the corresponding comment object,
 * also the comment id hava to be removed in the comments Array in the user informaiton.
 */
export const deleteCommentById = (id, userId) => {
  console.log("typeof id, userid", typeof id, typeof userId);
	delete Comments[`${id}`];
  // remove the value
  
  const newCommentArray = Users[`${userId}`].comments.filter(k => {
    return k !== id;
  });
  console.log(newCommentArray);
  Users[`${userId}`].comments = newCommentArray;
	return;
};

export const changeComment = (id, content) => {
  Comments[`${id}`].content = content;
  return;
}