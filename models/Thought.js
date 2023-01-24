const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,         
        get: (date) => date.toLocaleDateString(),
    }
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String, 
        required: true,
        maxLength: 280,
        minLength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,         
        get: (date) => date.toLocaleDateString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
});

userSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;