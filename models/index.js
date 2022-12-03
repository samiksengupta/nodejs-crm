'use strict';
const notification = require("./notification");
const ticket = require("./ticket");
const user = require("./user");

module.exports = {
    User: user,
    Ticket: ticket,
    Notification: notification
}