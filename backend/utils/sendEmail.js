const nodeMailer = require('nodemailer');

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // options for sending email
  const options = await transporter.sendMail({
    from: sent_from, // sender address
    to: send_to, // list of receivers
    replyTo: reply_to, // list of recipients
    subject: subject, // Subject line
    text: message, // plain text body
    html: message, // html body
  });

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.error(err);
    } else {
      console.log('Message sent: %s', info);
    }
  });
};
module.exports = sendEmail;
