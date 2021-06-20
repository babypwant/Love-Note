const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.router();

const { Notebook } = require('../../db/models')

router.get('/', asyncHandler(async (req, res,) => {
    const notebooks = await Notebook.findAll();
    res.json(notebooks);
}));

module.exports = router;
