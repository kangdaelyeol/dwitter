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
	let comments

  // the showing mode is up to mytwwets.
  if(req.session.mytweets){
    comments = modifyCommentsToBeShown(req.session?.user?.id);
  } else {
    comments = modifyCommentsToBeShown();
  }

	res.render('home.ejs', {
		user: req.session?.user,
		login: req.session?.login,
    comments,
    mytweets: req.session?.mytweets
	});
};
