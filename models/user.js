const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum : ['admin', 'engineer', 'customer'],
        default: 'customer'
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    }
}, {
    statics: {
        async authenticate(username, password) {
            const user = await this.findOne({ username: username }).select('password');
            if(user) {
                if(await comparePassword(password, user.password)) {
                    return user;
                }
            }
            return false;
        }
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    user.password = await hashPassword(user.password);
    next();
})

module.exports = mongoose.model("User", userSchema);