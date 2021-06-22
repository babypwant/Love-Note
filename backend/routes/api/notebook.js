const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')
const { Notebook } = require('../../db/models')
const csrf = require('csurf');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const cookieParser = require('cookie-parser');
const { handleValidationErrors } = require('../../utils/validation');


const notebookValidators = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("List name can't be empty."),
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage("userId can't be empty."),
    handleValidationErrors,
];

router.get('/', asyncHandler(async (req, res,) => {
    const notebooks = await Notebook.findAll();
    res.json(notebooks);
}));


router.post('/', notebookValidators, asyncHandler(async (req, res) => {
    const { name, description, userId } = req.body;
    const notebook = await Notebook.notebookCreate({
        name, description, userId
    })

    return res.json({
        notebook,
    });
}));


router.delete("/:id", asyncHandler(async (req, res, next) => {
    const notebook = await Notebook.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (res.locals.user.id !== list.userId) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to delete this tweet.";
        err.title = "Unauthorized";
        throw err;
    }
    if (notebook) {
        await notebook.destroy();
        await res.json({ message: `List ${notebook.name} is gone forever, poooof.` });
    } else {
        next(listNotFoundError(req.params.id));
    }
}));



module.exports = router;
