import { signinCheck } from '../controllers/signincontroller.js';
export const getSignin = (req, res, next) => {
	return res.render('signin');
};

export const postSignin = (req, res, next) => {
	const { id, password } = req.body;
	const {result, message} = signinCheck(id, password);
  if(!result){
    //when the login trying got failed.
    // messag will be used for error message
    console.log(message);
    return res.render("signin",{message});
  }

  // the result must be user information(object)
  

  // put userInfo in session, login state as well.

  req.session.login = true;
  req.session.user = {...result}
  // firstly, app have to show Alltweets
  req.session.mytweet = false;
  	return res.redirect('/');
};
