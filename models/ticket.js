const { default: mongoose } = require("mongoose");

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
        enum : ['open', 'closed', 'pending'],
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
    methods: {
        isClosed() {
            return this.status === 'closed'
        }
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);