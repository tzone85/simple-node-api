const express = require('express');
const debug = require('debug')('node-api:userrouter');

const multer = require('multer');
const path = require('path');

// set the storage destication and naming
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// will be using this for uploading
const upload = multer(({ storage: storage }));

// route basically acts like a mini app
const router = express.Router();

let users = [
    {
        id: 0,
        'name': 'Mncedi',
        'age': 30
    },
    {
        id: 1,
        'name': 'Thando',
        'age': 75
    }
];

// all endpoints do not require /users/ now

router.get('/', function (req, res) {
    return res.send(users);
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    return res.send(users[id]);
});

router.post('/', function (req, res) {
    users.push(req.body);
    return res.send(req.file);
});

// request will is going to first go through multer and then req.fule will be available
router.post('/register', upload.single('file'), function(req, res) {
    debug(req.file);
    return res.send(req.file);
});

router.put('/:index', function (req, res) {
    let index = req.params.index;
    users[index] = req.body;
    return res.send(users);
});

router.delete('/last', function (req, res) {
    res.send(users.pop());
});

// export it to be available for use in other files.
module.exports = router;