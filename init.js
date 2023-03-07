import express from 'express';
import { getSignin, postSignin } from './routes/signin.js';
import { getSignup, postSignup } from './routes/signup.js';
import { getSignout } from './routes/signout.js';
import { postComment } from './routes/comment.js';
import { getHome } from './routes/home.js';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import cookieParser from 'cookie-parser';
import sessions from "express-session";
import { getDelete } from './routes/delete.js';

/*
   definition of variuables for path
   in the case of module, when you make it as that to use the "modern ES6 syntex"
  , you have to define the path variables in person
 */
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({dest: "src/"})
const sessionOptions = sessions(
   {
      secret:"rkdeofuf",
      saveUninitialized: false,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24
      },
      resave: false
   }
)

// set up essential middwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionOptions);


app.set('view engine', 'ejs');
app.use('/src', express.static(path.join(__dirname, 'views', 'src')));

// Routes
app.route("/").get(getHome);
app.route('/signup').get(getSignup).post(postSignup);
app.route('/signin').get(getSignin).post(postSignin);
app.route("/signout").get(getSignout);
app.route("/comment").post(postComment);
app.route("/delete/:id").get(getDelete);

// if it's wrong access
app.use((req, res) => {
	res.sendStatus(404);
});

app.listen(4000, () => {
	console.log('app listening port 4000');
});
