const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models')
const csrf = require('csurf');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', asyncHandler(async (req, res,) => {
    const notes = await Note.findAll();
    res.json(notes);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { name, notebookId, description } = req.body;
    const note = await Note.noteCreate({
        name, notebookId, description
    })

    return res.json({
        note,
    });
}));

router.get('/:id', asyncHandler(async (req, res,) => {
    const notes = await Note.findAll();
    console.log('Hello')
    res.json(notes);
}));



module.exports = router;
