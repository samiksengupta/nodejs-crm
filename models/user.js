const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const roles = ['admin', 'engineer', 'customer'];

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
        required: function() {
            return this.isNew;
        },
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: roles,
        default: 'customer'
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
        select: false
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
        roles: roles,
        async authenticate(username, password) {
            const user = await this.findOne({ username: username }).select('password');
            if(user) {
                if(await comparePassword(password, user.password)) {
                    return user;
                }
            }
            return false;
        },
        async hasEngineers() {
            const count = await this.count({ role: 'engineer', isEnabled: true });
            return count > 0;
        }
    },
});

userSchema.virtual('isAdmin').get(function() {
    return ['admin'].includes(this.role);
});

userSchema.virtual('isEngineer').get(function() {
    return ['engineer'].includes(this.role);
});

userSchema.virtual('isCustomer').get(function() {
    return ['customer'].includes(this.role);
});

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) user.password = await hashPassword(user.password);
    if(user.isModified('role') && !user.isModified('isEnabled')) user.isEnabled = ['customer'].includes(user.role);
    next();
})

module.exports = mongoose.model("User", userSchema);