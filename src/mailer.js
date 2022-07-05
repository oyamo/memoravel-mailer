const nodemailer = require("nodemailer");
const path = require("path");


const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

/**
 * Sends html email using nodemailer
 * @param mailObj
 * @returns {Promise<void>}
 */
const sendEmail = async (mailObj) => {

    const { from, to, subject, text } = mailObj;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASSWORD

        }
    });

    const mailOptions = {
        from: `${from} <${GMAIL_USER}>`,
        to: to,
        subject: subject,
        html: text
    }

   return await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;