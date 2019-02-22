const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const app = express();
const bodyParser = require('body-parser');

const defaultRoute = require('./api/routes/default');
const feedRoute = require('./api/routes/feed');
const userRoute = require('./api/routes/user');
const utilsFunctions = require('./shared/utils/functions');
const utilsStrings = require('./shared/utils/strings');

// Lets us define an invironment variables inside .env file
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv1() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (utilsStrings.imgFileExt.test(file.originalname)) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

// Configure body-parser and multer
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({storage, fileFilter}).single('avatar'));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Fix CORS error
app.use(cors());

// Routes
app.use('/default', defaultRoute);
app.use('/feed', feedRoute);
app.use('/user', userRoute);

// Unknown routes/end points
app.use((req, res, next) => {
  utilsFunctions.customError('End point not found.', 404);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  console.log(message);
  res.status(statusCode).json({message});
});

module.exports = app;
