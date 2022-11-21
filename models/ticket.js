const { default: mongoose } = require("mongoose");

const statuses = ['open', 'closed', 'pending'];

const ticketSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum : statuses,
        default: 'open'
    },
    raisedByUser: {
        type: String
    },
    assignedToUser: {
        type: String
    },
}, {
    timestamps: true,
    statics: {
        statuses: statuses
    }
});

ticketSchema.virtual('isClosed').get(function() {
    return this.status === 'closed';
});

module.exports = mongoose.model("Ticket", ticketSchema);