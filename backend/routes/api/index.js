const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const noteBookRouter = require('./notebook.js')
const notesRouter = require('./note')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', noteBookRouter)
router.use('/notes', notesRouter)

router.get('/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ csrfToken });
  });

//TEST ROUTES FOR AUTH USER, RESTORE USER, & REQIUIRE AUTH
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        },
    })
    setTokenCookie(res, user);
    return res.json({ user });
}));

const { restoreUser } = require('../../utils/auth.js');
router.get(
    '/restore-user',
    restoreUser,
    (req, res) => {
        print(req.user)
        return res.json(req.user);
    }
);

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);
//TEST ROUTES FOR AUTH USER, RESTORE USER, & REQIUIRE AUTH

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;