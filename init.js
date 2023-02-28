import express from 'express';
import { getSignin, postSignin } from './routes/signin.js';
import { getLogin, postLogin } from './routes/login.js';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";

/*
   definition of variuables for path
   in the case of module, when you make it as that to use the "modern ES6 syntex"
  , you have to define the path variables in person
 */
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({dest: "src/"})

// set up essential middwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/src', express.static(path.join(__dirname, 'views', 'src')));

app.get('/', (req, res) => {
	res.render('home.ejs');
});

app.route('/signin').get(getSignin).post(postSignin);
app.route('/login').get(getLogin).post(postLogin);

// if it's wrong access

app.use((req, res) => {
	res.sendStatus(404);
});

app.listen(4000, () => {
	console.log('app listening port 4000');
});
