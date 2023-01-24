const Thought = require('../models/Thought');
const User = require('../models/User');
const router = require('express').Router();

router.get('/', (req, res) => {
    Thought.find().then(thoughts => {
        res.json(thoughts.map(thought => thought.toJSON()));
    }).catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

router.get('/:id', (req, res) => {
    Thought.findById(req.params.id).then(thought => {
        res.json(thought.toJSON());
    }).catch(() => {
        res.status(404).send('');
    });
});

router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate({_id: req.params.id}, req.body).then(() => {
        res.send('');
    }).catch(() => {
        res.status(404).send('');
    });
});

router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({_id: req.params.id}).then(() => {
        res.send('');
    }).catch(() => {
        res.status(404).send('');
    });
});

router.post('/', (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        Thought.create(req.body).then(thought => {
            user.thoughts.push(thought._id);
            user.save().then(() => {
                res.json(thought.toJSON());
            }).catch(error => {
                res.status(400).send(error);
            });
        }).catch(error => {
            res.status(400).send(error);
        });
    }).catch(() => {
        res.status(404).send('');
    });
});

router.post('/:id/reactions', (req, res) => {
    Thought.findById(req.params.id).then(foundThought => {
        Thought.findByIdAndUpdate(
            req.params.id, 
            {$addToSet: {reactions: {
                reactionBody: req.body.reactionBody,
                username: foundThought.username,
            }}}, 
            {new: true}
        ).then(thought => {
            res.json(thought.toJSON());
        }).catch(() => {
            res.status(404).send('');
        });
    }).catch(() => {
        res.status(404).send('');
    });
});

router.delete('/:id/reactions/:reaction', (req, res) => {
    Thought.findByIdAndUpdate(
        req.params.id, 
        {$pull: {reactions: {reactionId: req.params.reaction}}}
    ).then(thought => {
        res.json(thought.toJSON());
    }).catch(() => {
        res.status(404).send('');
    });
});

module.exports = router;