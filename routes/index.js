const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post("/nodemailerTest", function (req, res, next) {
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email',  // gmail 계정 아이디를 입력
            pass: 'passwd'          // gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: 'email',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email,                     // 수신 메일 주소
        subject: 'Sending Email using Node.js',   // 제목
        text: 'That was easy!'  // 내용
    };

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