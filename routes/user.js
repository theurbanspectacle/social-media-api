const Thought = require('../models/Thought');
const User = require('../models/User');
const router = require('express').Router();

router.get('/', (req, res) => {
    User.find().populate('friends').populate('thoughts').then(users => {
        res.json(users.map(user => user.toJSON()));
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id).populate('friends').populate('thoughts').then(user => {
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
    User.findOneAndDelete({_id: req.params.id}).then(user => {
        Thought.deleteMany({username: user.username}).then(() => {
            res.send('');
        }).catch(() => {
            res.send('');
        });
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

router.post('/:id/friends/:friend', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id, 
        {$addToSet: {friends: req.params.friend}}, 
        {new: true}
    ).populate('friends').populate('thoughts').then(user => {
        res.json(user.toJSON());
    }).catch(() => {
        res.status(404).send('');
    });
});

router.delete('/:id/friends/:friend', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id, 
        {$pull: {friends: req.params.friend}}
    ).populate('friends').populate('thoughts').then(user => {
        res.json(user.toJSON());
    }).catch(() => {
        res.status(404).send('');
    });
});

module.exports = router;