const express = require('express');
const ejs = require('ejs');
const path = require('path');
const router = express.Router();
const sendEmail = require('../src/mailer');

router.post('/', async function(req, res){
    // render the tickets.ejs file with res body
    const ticket_details = req.body;   // get the ticket details from the request body


    // check if the ticket details available
    if(ticket_details){
        ejs.renderFile(path.resolve(__dirname, '../views/ticket.ejs'), {...ticket_details}, async function (err, data) {
            if (err) {
                // Error with status code 500
                res.status(500).send(err);
                console.log(err);
                console.log(data);

            } else {
                // send an email with the ticket details
                await sendEmail({
                    from: 'Memoravel Notifications',
                    to: 'memoraveltravel@gmail.com',
                    subject: 'New Ticket',
                    text: data,
                })
                // send a response with the ticket details
                res.send(ticket_details);
            }
        });
    } else {
        // Error with status code 500
        res.status(400).send('No ticket details available');
    }

});

module.exports = router;