const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// BUGS in HEROKU? https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

router.post('/', (req, res) => {

    // this is the ship the user's email rides
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.FEEDBACK_EMAIL_USERNAME || 'abc@gmail.com', // AUDRY - do we want an OR?
        pass: process.env.FEEDBACK_EMAIL_PASSWORD || '1234' // AUDRY - do we want an OR?
      }
    });

    // here's where we set who does what
    let mailOptions = {
      to: process.env.FEEDBACK_EMAIL || 'abc@gmail.com',
      text: `from: ${req.body.userName}, their email: ${req.body.userEmail}, and their feedback: ${req.body.emailBody}`
    };

    // send that email!
    transport.sendMail(mailOptions, (err, data) => {
      if (err) {
          return log('Error occurs');
      }
      return log('Email sent!!!');
    });
})
  
module.exports = router;
