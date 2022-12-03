const { default: mongoose } = require("mongoose");

const statuses = ['pending', 'sent'];

const notificationSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    emails: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: statuses,
        default: 'pending'
    },
    userId: {
        type: String,
        required: true
    },
    ticketId: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    statics: {
        statuses: statuses
    }
});

module.exports = mongoose.model("Notification", notificationSchema);