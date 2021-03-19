const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {
    let users = require('../public/users')
    let user = users.find(item => item.id == req.params.id)
    if (!user)
        res.status(404).send()
    else
        res.status(200).render('profile.ejs', user)
});

module.exports = router;