const express = require('express');
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register/register.html"))
})

router.post('/authentication', (req, res) => {
    let users = require('../public/users')
    let user = users.find(item => item.username == req.body.username)
    if (!user) {
        users.push(req.body)
        fs.writeFile('public/users.json', JSON.stringify(users), "utf8", (err) => {
            if (err) return res.status(400).send("something went wrong")
            res.status(200).send()
        })
    } else
        res.status(400).send("invalid username")
});

router.post('/modify', (req, res) => {
    let users = require('../public/users')
    let user = users.find(item => item.username == req.body.username)
    if (user.isLoggedIn && (req.body.password == "" || req.body.password == user.password)) {
        user.email = req.body.email;
        user.gender = req.body.gender;
        if (req.body.password == user.password) {
            user.password = req.body.newpass;
            user.isLoggedIn = false;
            user.id = ""
        }
        fs.writeFile('public/users.json', JSON.stringify(users), "utf8", (err) => {
            if (err) return res.status(400).send("something went wrong")
            res.status(200).send()
        })
    } else
        res.status(400).send("invalid password")
});

module.exports = router;