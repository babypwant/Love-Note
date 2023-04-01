const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const csrf = require('csurf');

router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}

// CSRF middleware
const csrfProtection = csrf({ cookie: true });

// Add a _csrf cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', csrfProtection, (req, res) => {
        const token = req.csrfToken();
        res.cookie('XSRF-TOKEN', token, { httpOnly: false, secure: false });
        console.log('Landing page token', token);
        res.status(201).json({});
    });
}

module.exports = router;
