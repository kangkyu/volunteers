var express = require('express');
var router = express.Router();

var _ = require('lodash-node');

var users = [
    {
        "_id": "1",
        "firstName": "Randy",
        "lastName": "Johnson",
        "email": "randy@example.com"
    },
    {
        "_id": "2",
        "firstName": "Ty",
        "lastName": "Cobb",
        "email": "ty@example.com"
    },
    {
        "_id": "3",
        "firstName": "Christy",
        "lastName": "Mathewson",
        "email": "christopher@example.com"
    },
    {
        "_id": "4",
        "firstName": "Nap",
        "lastName": "Lajoie",
        "email": "napoleon@example.com"
    }
];
var uuid = 4;

function getId() {
    return ++uuid;
}

function addUser(user) {
    user._id = getId();
    users.push(user);
}

/* /api/users. */
router.route('/')
    .get(function (req, res, next) {
        res.json(users);
    })
    .post(function (req, res, next) {
        addUser(req.body);
        res.send(users[users.length - 1]);
    });

/* /api/users/id. */
router.param(':id', function (req, res, next, id) {
    req.data = users.filter(function (user) {
        return user._id == id;
    })[0] || {};
    next();
});

router.route('/:id')
    .all(function (req, res, next) {
        next();
    })
    .get(function (req, res, next) {
        res.json(req.data);
    })
    .put(function (req, res, next) {
        var deletedUser = {};

        var index = _.findIndex(users, function (user) {
            return user._id == req.data._id;
        });

        if (index !== -1) {
            deletedUser = users.splice(index, 1)[0];
            users.push(req.body);
        }

        res.json(req.body);

    })
    .delete(function (req, res, next) {
        var deletedUser = {};

        var index = _.findIndex(users, function (user) {
            return user._id == req.data._id;
        });

        if (index !== -1) {
            deletedUser = users.splice(index, 1)[0];
        }

        res.json(deletedUser);
    });


module.exports = router;
