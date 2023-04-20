const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csrf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const routes = require('./routes');
require('dotenv').config();


const isProduction = environment === 'production';

const app = express();

const session = require('express-session');


app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
  secret: process.env.CSRF_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
  },
}));

app.use(express.json());
if (!isProduction) {
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
}
app.use(helmet({
    contentSecurityPolicy: false
}));


const csrfSecret = process.env.CSRF_SECRET;
console.log('csrfSecret:', csrfSecret); // logging csrfSecret to make sure it's being properly set
const csrfProtection = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
  },
  secret: csrfSecret,
});

app.use((req, res, next) => {
    if (req.path === '/api/csrf/restore') {
      return next();
    }
    csrfProtection(req, res, next);
  });

app.use(routes);



app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
