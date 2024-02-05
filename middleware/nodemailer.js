const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'subbankhan96@gmail.com',
    pass: 'zrga jhrq onml brjs'
  }
});
function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000)
}
const otp = generateOTP()
// Email content
const mailOptions = {
  from: 'subbankhan96@gmail.com',
  to: req.body,
  subject: 'send OTP ',
  text: `${otp}`
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
