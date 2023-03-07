import { modifyCommentsToBeShown } from '../controllers/commentController.js';

/** comments
 * {
 *  commentId: {
 *    nickname, profile, ownerId: number, content, createAt
 *  }
 * }
 * 
 *  ---- req.sesssion.user -----
 * {
  id: 64346587233,
  accountId: '13',
  password: '13',
  nickname: '13',
  comments: [],
  profile: 'no_image'
}
 */

export const getHome = (req, res, next) => {
	const comments = modifyCommentsToBeShown();
  console.log(req.session?.user);
	res.render('home.ejs', {
		user: req.session?.user,
		login: req.session?.login,
    comments
	});
};
