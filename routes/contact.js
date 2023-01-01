var express = require('express');
const ejs = require('ejs');
const path = require('path');
const sendMail = require('../src/mailer');
var router = express.Router();

router.post('/', async function (req, res) {
    const contact_details = req.body;

    if (contact_details.name && contact_details.email && contact_details.message) {
        ejs.renderFile(path.join(__dirname, '../views/contact.ejs'), contact_details,  function (err, html) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                // await sendMail({
                //     from: 'Memoravel Notifications',
                //     to: 'oyamobrian8@gmail.com',
                //     subject: 'New Message',
                //     text: html
                // })

                res.status(200).send('Email sent successfully');
            }
        });
    } else {
        res.status(400).json({
            message: 'Please provide all the required fields'
        });
    }
});

module.exports = router;