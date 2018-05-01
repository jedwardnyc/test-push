const { gridKey } = require('./config');
const nodemailer = require('nodemailer');

const sendReset = (user, token) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, 
    auth: {
        user: 'apikey', 
        pass: gridKey 
    }
  });
  
  let mailOptions = {
    to: user.email,
    from: 'passwordreset@thelightweb.com',
    subject: 'The Light Web Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process:
      http://localhost:3000/#/reset/${token}
      If you did not request this, please ignore this email and your password will remain unchanged.`,
    html: `<h4>You are receiving this because you (or someone else) have requested the reset of the password for your account.</h4>
      <p>Please click on the following link, or paste this into your browser to complete the process: http://localhost:3000/#/reset/${token}</p>
      <h4>If you did not request this, please ignore this email and your password will remain unchanged.</h4>`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
};

const sendConfirmation = (user) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, 
    auth: {
        user: 'apikey', 
        pass: gridKey 
    }
  });
  
  let mailOptions = {
    to: user.email,
    from: 'passwordreset@thelightweb.com',
    subject: 'Your password has been changed',
    text: `Hello ${user.fullname},
    This is a confirmation that the password for your account ${user.email} has just been changed`,
    html: `<h4>Hello ${user.fullname},</h4>
      <p>This is a confirmation that the password for your account ${user.email} has just been changed</p>`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
};

const sendWelcome = (user) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, 
    auth: {
        user: 'apikey', 
        pass: gridKey 
    }
  });
  
  let mailOptions = {
    to: user.email,
    from: 'welcome@thelightweb.com',
    subject: 'Your account has been created!',
    text: `Hello ${user.firstname},
    Welcome to The Light Web, you center for all things dark web sounding, but actually legal.
    Unfortunately, at this time this isn't a real site (I know, right?), but thanks for signing up for our project site!
    This site was made for FullStack Academy for our Grace Shopper assignment. 
    It was designed and created by Jacob Rico, Balthazar Villegas, and Chaehoon Lim.`,
    html: `<h2>Hello ${user.firstname}</h2>,
    <h5><strong>Welcome to <a href='the-light-web.herokuapp.com'>The Light Web</a>,</strong> you center for all things dark web sounding, but actually legal.</h5>
    <h6>Unfortunately, at this time this isn't a real site (I know, right?), but <strong>thanks for signing up for our project site</strong>!
    This site was made for FullStack Academy for our Grace Shopper assignment.</h6> 
    <h5>It was designed and created by Jacob Rico, Balthazar Villegas, and Chaehoon Lim.</h5>`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
};

module.exports = { 
  sendReset,
  sendConfirmation,
  sendWelcome
};