const express = require('express');
// no DB needed so far -- const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');


router.get('/', (req, res) => {

    console.log('in router!');


    const {
            emailBody,
            userEmail,
            userName
          } = req.body;

          //what how i get data? action payload

    console.log( 'req body', req.body );

    // this is the ship the user's email rides
    var transport = nodemailer.createTransport({
      // AUDRY - we need to contact WeSparkle for this info. 
      // They've got it set up already, we just need their 
      // host, port, email, password
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "96acbdbff9f2ca",  // user: process.env.EMAIL || 'abc@gmail.com', 
        pass: "055545b4aa2cfc"   // pass: process.env.PASSWORD || '1234'
      }
    });

    // here's where we set who does what
    let mailOptions = {
      //from: 'audrywolters@gmail.com', // req.body.userEmail - orWhateverIcallIt <-- huh 
      to: 'paxossparkles-2038ac@inbox.mailtrap.io',   // process.env.EMAIL || 'abc@gmail.com'
      text: 'user objects'
    };

    // send that email!
    transport.sendMail(mailOptions, (err, data) => {
      if (err) {
          return log('Error occurs');
      }
      return log('Email sent!!!');
    });
})
  





// FEEDBACK_EMAIL
// FEEDBACK_EMAIL_PASSWORD
// sendmail, a regular sendmail command for simple messages.

module.exports = router;