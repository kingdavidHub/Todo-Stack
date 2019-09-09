const express = require('express').Router();
const router = express;

const Excercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Excercise.find()
        .then(excercise => res.json(excercise))
        .catch(err => res.status(400).json(`Error ${err}`))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date)

    const newExercise = new Excercise({
        username,
        description,
        duration,
        date
    });



    newExercise.save()
        // .then(user => res.json(user)) backend code
        .then(() => res.json('Execercise added'))
        .catch(err => res.status(400).json(`Error ${err}`))
});

router.route('/:id').get((req, res) => {
    const id = req.params.id;
    Excercise.findOne({
            _id: id
        })
        .then(excercise => res.json(excercise))
        .catch(err => res.status(400).json(`Error ${err}`))
});


router.route('/:id').delete((req, res) => {
  Excercise.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Excercise deleted"))
      .catch(err => res.status(400).json(`Error ${err}`))
});

router.route('/update/:id').post((req, res) => {
    Excercise.findById(req.params.id)
        .then(excercise => {
            excercise.username = req.body.username;
            excercise.description = req.body.description;
            excercise.duration = Number(req.body.duration);
            excercise.date = Date.parse(req.body.date);

            excercise.save()
                .then(excercise => res.json({
                    Excercise: "Yo it has being updated",
                    excercise
                }))
                .catch(err => res.status(400).json(`Error ${err}`));
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;