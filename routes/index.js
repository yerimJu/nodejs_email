const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const OWNER_EMAIL = 'yr2675@gmail.com';
const OWNER_PASSWD = '****';


router.post("/nodemailerTest", function (req, res, next) {
    let transporter = nodemailer.createTransport({
        // enter your gmail account, check security option before sending
        service: 'gmail',
        auth: {
            user: OWNER_EMAIL,
            pass: OWNER_PASSWD
        }
    });
    
    console.log('Recieved:');
    console.log(req.body);
    let recipient = req.body.recipient;
    let username = recipient.split('@')[0];
    let subject = req.body.subject;
    let contentsType = req.body.contentsType;

    let mailOptions = {
        from: OWNER_EMAIL,
        to: recipient,
        subject: subject
    };

    // console.log(contentsType)
    if (contentsType === 'html') {
        mailOptions.html = `<p>Hello, ` + username + `!</p>
        <p>Here's a video for you as an embedded attachment:<img src="cid:note@example.com"/></p>
        <video src="cid:nyan@example.com" controls preload autoplay></video>`;
        mailOptions.attachments = [
            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),
                cid: 'note@example.com' // should be as unique as possible
            },
            // File Stream attachment
            {
                filename: 'test.mp4',
                path: 'http://127.0.0.1:3000/static/topgolf_ad_360p.mp4',
                cid: 'nyan@example.com' // should be as unique as possible
            }
        ];
    } else if (contentsType === 'text') {
        mailOptions.text = req.body.contents;
    }

    console.log('You sent:');
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