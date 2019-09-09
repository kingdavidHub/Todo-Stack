const express = require('express');
const router = express.Router();
const User = require('../models/user.model');



router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error ${err}`))
});

router.route('/add').post((req, res) => {
    const newUser = new User({ username: req.body.username });
    
    newUser.save()
        // .then(() => res.json(newUser)) backend code
            .then(() => res.json('User Added')) //front end code
        .catch(err => res.status(400).json(`Error ${err}`))
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error ${err}`));
});



module.exports = router;