const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const OWNER_EMAIL = 'yr2675@gmail.com';
const OWNER_PASSWD = '***';


router.post("/nodemailerTest", function (req, res, next) {
    // console.log(req.body);
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        // enter your gmail account, check security option
        service: 'gmail',
        auth: {
            user: OWNER_EMAIL,
            pass: OWNER_PASSWD
        }
    });

    let mailOptions = {
        from: OWNER_EMAIL,
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect("/");
})

module.exports = router;