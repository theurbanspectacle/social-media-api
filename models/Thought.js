const mongoose = require('mongoose');

/**
 * Format the date
 * 
 * @param {Date} date - the date
 * @returns {String} - formatted string of date
 */
const formatDate = date => {
    return date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: 'numeric', minute: '2-digit'});
}

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
        get: date => formatDate(date),
    }
},
{
    id: false,
    toJSON: {
        getters: true
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
        get: date => formatDate(date),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    id: false,
    toJSON: {
        getters: true
    }
});

thoughtSchema.virtual('reactionCount').get(function() {return this.reactions.length});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;