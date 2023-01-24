const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
           (email) => {
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email)
           },
           'Provide valid email.'
        ]
    },
    thoughts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
},
{
  id: false,
  toJSON: {
      getters: true
  }
});

userSchema.virtual('friendCount').get(function() {return this.friends.length});

const User = mongoose.model('User', userSchema);

module.exports = User;