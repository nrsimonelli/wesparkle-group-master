const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// BUGS in HEROKU? https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

router.post("/", (req, res) => {
  // this is the ship the user's email rides
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.FEEDBACK_EMAIL_USERNAME || "abc@gmail.com", // AUDRY - do we want an OR?
      pass: process.env.FEEDBACK_EMAIL_PASSWORD || "1234", // AUDRY - do we want an OR?
    },
  });

  // here's where we set who does what
  let mailOptions = {
    to: process.env.FEEDBACK_EMAIL || "abc@gmail.com", // AUDRY - do we want an OR?
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
