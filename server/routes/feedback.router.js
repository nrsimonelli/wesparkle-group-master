const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// BUGS in HEROKU? https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

router.post("/", (req, res) => {
  // this is the ship the user's email sails
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.FEEDBACK_EMAIL_USERNAME,
      pass: process.env.FEEDBACK_EMAIL_PASSWORD
    },
  });

  // here's where we set who does what
  let mailOptions = {
    subject: 'We Sparkle User Feedback',
    to: process.env.FEEDBACK_EMAIL,
    html: `<p>From: ${req.body.userName}</p>
           <p>Email: ${req.body.userEmail}</p>
           <p>Message: ${req.body.emailBody}</p>`,
  };

  // send that email!
  transport.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log("Error occurred:", err.message);
    }
    res.send(data.response);
    return console.log("Email sent!!! Response:", data.response);
  });
});

module.exports = router;
