const express = require('express');
const ejs = require('ejs');
const path = require('path');
const sendEmail = require('../src/mailer');
const router = express.Router();

router.post('/', (req, res) => {
    const visa_details = req.body;

    if (visa_details) {
        ejs.renderFile(path.join(__dirname, '../views/visa.ejs'), {...visa_details}, async (err, html) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                await sendEmail({
                    from: "Memoravel Notifications",
                    to: 'memoraveltravel@gmail.com',
                    subject: 'New Visa Application',
                    text: html,
                })
                res.status(200).send('Email sent');

            }
        });
    } else {
        res.status(400).send('Bad Request');
    }
});

module.exports = router;
