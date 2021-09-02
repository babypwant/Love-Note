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
    console.log(note)

    return res.json({
        note,
    });
}));

router.get('/:id', asyncHandler(async (req, res,) => {
    const notes = await Note.findAll();
    console.log('Hello')
    res.json(notes);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const note = await Note.findOne({
        where: {
            id: req.params.id
        }
    })
    if (note) {
        await note.update({ name: req.body.name, description: req.body.description });
        res.json({ notebook })
    } else {
        next(listNotFoundError(req.params.id));
    }
}));


router.delete("/:id", asyncHandler(async (req, res, next) => {
    const note = await Note.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (note) {
        await note.destroy();
        await res.json({ message: `Ancient lore ${note.name} is gone forever, no more butterbread receipes` });
    } else {
        next(listNotFoundError(req.params.id));
    }
}));



module.exports = router;
