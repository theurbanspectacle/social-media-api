const User = require('../models/User');
const router = require('express').Router();

router.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users.map(user => user.toJSON()));
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        res.json(user.toJSON());
    }).catch(() => {
        res.status(404).send('');
    });
});

router.put('/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body).then(() => {
        res.send('');
    }).catch(() => {
        res.status(404).send('');
    });
});

router.delete('/:id', (req, res) => {
    User.findOneAndDelete({_id: req.params.id}).then(() => {
        res.send('');
    }).catch(() => {
        res.status(404).send('');
    });
});

router.post('/', (req, res) => {
    User.create(req.body).then(user => {
        res.json(user.toJSON());
    }).catch(error => {
        res.status(400).send(error);
    });
});

module.exports = router;