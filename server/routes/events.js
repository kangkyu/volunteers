var express = require('express');
var router = express.Router();

var _ = require('lodash-node');

var events = [
    {
        _id: 1,
        title: "Olympics",
        address: "Rio De Janeiro, Brazil",
        date: "Aug 21, 2016",
        time: "1pm"
    },
    {
        _id: 2,
        title: "Super Bowl",
        address: "Phoenix, Arizona",
        date: "Feb 1, 2015",
        time: "2am"
    },
    {
        _id: 3,
        title: "World Cup",
        address: "Rio De Janeiro, Brazil",
        date: "Jun 12, 2014",
        time: "2pm"
    },
    {
        _id: 4,
        title: "World Series",
        address: "San Francisco, California",
        date: "Oct 21, 2014",
        time: "3pm"
    }
];
var uuid = 4;

function getId() {
    return ++uuid;
}

function addEvent(event) {
    event._id = getId();
    events.push(event);
}

/* /api/events. */
router.route('/')
    .get(function (req, res, next) {
        res.json(events);
    })
    .post(function (req, res, next) {
        addEvent(req.body);
        res.send(events[events.length - 1]);
    });

/* /api/events/id. */
router.param(':id', function (req, res, next, id) {
    req.data = events.filter(function (event) {
        return event._id == id;
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
        var deletedEvent = {};

        var index = _.findIndex(events, function (event) {
            return event._id == req.data._id;
        });

        if (index !== -1) {
            deletedEvent = events.splice(index, 1)[0];
            events.push(req.body);
        }

        res.json(req.body);

    })
    .delete(function (req, res, next) {
        var deleteEvent = {};

        var index = _.findIndex(events, function (event) {
            return event._id == req.data._id;
        });

        if (index !== -1) {
            deleteEvent = events.splice(index, 1)[0];
        }

        res.json(deleteEvent);
    });


module.exports = router;
