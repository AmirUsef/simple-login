const express = require('express');
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login/login.html"))
});

router.post('/authentication', (req, res) => {
    let users = require('../public/users')
    let user = users.find(item => item.username == req.body.username)
    if (user === undefined || user.password != req.body.password)
        res.status(400).send()
    else {
        user.isLoggedIn = true;
        user.id = uuidv4();
        fs.writeFile('public/users.json', JSON.stringify(users), "utf8", (err) => {
            if (err) return res.status(400).send("something went wrong")
            res.status(200).send({ uuid: user.id })
        })

    }
});

router.post('/logout', (req, res) => {
    let users = require('../public/users')
    let user = users.find(item => item.username == req.body.username)
    if (user === undefined || user.id != req.body.uid)
        res.status(400).send()
    else {
        user.isLoggedIn = false;
        user.id = "";
        fs.writeFile('public/users.json', JSON.stringify(users), "utf8", (err) => {
            if (err) return res.status(400).send("something went wrong")
            res.status(200).send()
        })
    }
});

module.exports = router;