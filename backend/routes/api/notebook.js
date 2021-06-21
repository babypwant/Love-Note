const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')
const { Notebook } = require('../../db/models')
const csrf = require('csurf');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const cookieParser = require('cookie-parser');


router.get('/', asyncHandler(async (req, res,) => {
    const notebooks = await Notebook.findAll();
    res.json(notebooks);
}));


router.post('/', asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const notebook = await Notebook.db.build({
        name: name,
        description, description,
    });

    await setTokenCookie(res, user);

    return res.json({
        notebook,
    });
}),
);
module.exports = router;
