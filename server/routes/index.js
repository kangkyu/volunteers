var path = require('path');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
    //console.log(path.join(__dirname, '../..', 'index.html'));
    res.sendFile(path.join(__dirname, '../..', 'index.html'));
});

module.exports = router;
