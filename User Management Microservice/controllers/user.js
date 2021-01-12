const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Security = require('../security/security.js');
const apacheServer = '/var/www/html';
const { totp } = require('@otplib/preset-v11');

//user signup controller
exports.signup = (req, res, next) => {
  console.log('SIGNUP');
  const mail = req.body.email.toLowerCase();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: mail,
        emailConfirmed: false,
        firstConnection: true,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({message: 'New user created'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//user login controller
exports.login = (req, res, next) => {
  console.log('LOGIN');
  const mail = req.body.email.toLowerCase();
  const tokenKey = Security.getSessionTokenKey();
  User.findOne({email: mail })
    .then(user => {
      if (!user) {
        return res.status(401).json({error: 'User not found'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({error: 'Incorrect password'});
          }
          res.status(200).json({
            userId: user._id,
            firstConnection: user.firstConnection,
            emailConfirmed: user.emailConfirmed,
            token: jwt.sign(
              {userId: user._id}, tokenKey, {expiresIn: '15d'})
          });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//user token verification controller
exports.handleTokenVerification = (req, res, next) => {
  console.log('HANDLE TOKEN VERIFICATION');
  try {
    const token = req.body.token;
    const tokenType = req.body.tokenType;
    const userId = req.body.userId;
    let tokenKey;
    //session token
    if (tokenType === 'sessionToken') {
      tokenKey = Security.getSessionTokenKey();
      try {
        //check token validity
        const payload = jwt.verify(token, tokenKey);
        //update token
        const updatedToken = jwt.sign({userId: userId}, tokenKey, {expiresIn: '15d'});
        //return updated token
        return res.status(200).json({message: updatedToken});
      }
      //invalid token
      catch(err) {
        return res.status(601).json(err);
      }
    }
    //access token
    else if (tokenType === 'accessToken') {
      tokenKey = Security.getAccessTokenKey();
      try {
        //check token validity
        const payload = jwt.verify(token, tokenKey);
        //update token
        const updatedToken = jwt.sign({userId: userId}, tokenKey, {expiresIn: '1m'});
        //return updated token
        return res.status(200).json({message: updatedToken});
      }
      //invalid token
      catch(err) {
        return res.status(601).json(err);
      }
    }
  }
  catch(error) {
    return res.status(500).json(err);
  }
};

//first connection validation controller
exports.validateFirstConnection = (req, res, next) => {
  console.log('VALIDATE FIRST CONNECTION');
  const userId = req.body.userId;
  const filter = {_id: userId};
  const update = {firstConnection: false};
  User.findOneAndUpdate(filter, update, {new: true})
  .then((user) => {
    user.save()
    .then(() => res.status(200).json({message: 'User first connection validated'}))
    .catch(error => printAndReturnError(res, error, 400));
  })
  .catch(error => printAndReturnError(res, error, 500));
};

//confirm user email link controller
exports.confirmUserEmailLink = (req, res, next) => {
  console.log('CONFIRM EMAIL LINK NEW');
  //get user data from database
  getUserData(res, req.body.email, function(user) {
    const pagesFolderPath = '/emails/emailConfirmation/pages/';
    //get the email confirmation page HTML template
    getTemplate(res, 'confirmPage', req.body.language, function(pageTemplate) {
      //replace placeholder with user ID
      replacePlaceholderWithUserEmail(pageTemplate, req.body.email, function(pageTemplateUpdated) {
        //create a random page name
        const pageName = createNewPageName();
        //create html page from updated templates
        createHtmlPage(res, pageName, pageTemplateUpdated, function() {
          //move html file on the apache page folder
          moveHtmlPage(res, pageName, '/var/www/html/emails/emailConfirmation/pages/', function() {
            //get the email confirmation email HTML template
            getTemplate(res, 'confirmEmail', req.body.language, function(emailTemplate) {
              //replace placeholder with page link on apche server
              replaceHrefWithPageLink(emailTemplate, pageName, 'https://www.pawlaczyk.fr/emails/emailConfirmation/pages/', function(updatedEmailTemplate) {
                const page = pagesFolderPath + pageName;
                //set timeout bedore deleting page on apache server (10 minutes)
                setTimeout(() => deleteHtmlPage(apacheServer, page), 600000);
                //get the email subject
                const emailSubject = getEmailSubject(req.body.language, 'confirmationEmail');
                //send email using the updated email template
                sendEmail(res, updatedEmailTemplate, emailSubject, req.body.email);
              });
            });
          });
        });
      });
    });
  });
};

//confirm user email controller
exports.confirmEmail = (req, res, next) => {
  console.log('CONFIRM EMAIL');
  User.findOne({email: req.body.email})
    .then((user) => {
      user.emailConfirmed = true;
      user.save()
      .then(() => res.status(200).json({message: 'User email confirmed'}))
      .catch(error => printAndReturnError(res, error, 400));
    })
    .catch(error => printAndReturnError(res, error, 500));
};

//reset user password link controller
exports.resetPasswordLink = (req, res, next) => {
  console.log('RESET PASSWORD LINK');
  //get TOTP secret
  const secret = Security.getOtpSecretToken();
  //date used to set TOTP epoch option
  const now = new Date();
  //defines options for TOTP
  totp.options = {
    digits: 6,
    epoch: Math.round(now.getTime() / 1000)
  };
  //generate OTP
  const otp = totp.generate(secret);
  //get user data from database
  getUserData(res, req.body.email, function(user) {
    const pagesFolderPath = '/emails/resetPassword/pages/';
    //get the reset password page HTML template
    getTemplate(res, 'otpPage', req.body.language, function(pageTemplate) {
      //replace placeholder with user ID
      replacePlaceholderWithUserEmail(pageTemplate, req.body.email, function(pageTemplateUpdated) {
        //create a random page name
        const pageName = createNewPageName();
        //create html page from updated templates
        createHtmlPage(res, pageName, pageTemplateUpdated, function() {
          //move html file on the apache page folder
          moveHtmlPage(res, pageName, '/var/www/html/emails/resetPassword/pages/', function() {
            //get the reset password email HTML template
            getTemplate(res, 'resetEmail', req.body.language, function(emailTemplate) {
              //replace placeholder with page link on apche server
              replaceOtpPlaceholder(emailTemplate, pageName, 'https://www.pawlaczyk.fr/emails/resetPassword/pages/', otp, function(updatedEmailTemplate) {
                const page = pagesFolderPath + pageName;
                //set timeout bedore deleting page on apache server (10 minutes)
                setTimeout(() => deleteHtmlPage(apacheServer, page), 600000);
                //get the email subject
                const emailSubject = getEmailSubject(req.body.language, 'resetEmail');
                //send email using the updated email template
                sendEmail(res, updatedEmailTemplate, emailSubject, req.body.email);
              });
            });
          });
        });
      });
    });
  });
};

//validate OTP controller
exports.validateOtp = (req, res, next) => {
  console.log('VALIDATE OTP');
  //get TOTP secret
  const secret = Security.getOtpSecretToken();
  //check TOTP validity
  const isValid = totp.check(req.body.otp, secret);
  //TOTP is valid
  if (isValid) {
    const pagesFolderPath = '/emails/resetPassword/pages/';
    //delete otp page
    deleteHtmlPage(apacheServer + pagesFolderPath, req.body.otpPage);
    //get the reset password page HTML template
    getTemplate(res, 'resetPage', req.body.language, function(pageTemplate) {
      //replace placeholder with user ID
      replacePlaceholderWithUserEmail(pageTemplate, req.body.email, function(pageTemplateUpdated) {
        //create a random page name
        const pageName = createNewPageName();
        //create html page from updated templates
        createHtmlPage(res, pageName, pageTemplateUpdated, function() {
          //move html file on the apache page folder
          moveHtmlPage(res, pageName, '/var/www/html/emails/resetPassword/pages/', function() {
            //get the reset password email HTML template
            getTemplate(res, 'resetEmail', req.body.language, function(emailTemplate) {
              //replace placeholder with page link on apche server
              replaceHrefWithPageLink(emailTemplate, pageName, 'https://www.pawlaczyk.fr/emails/resetPassword/pages/', function(updatedEmailTemplate) {
                let page = pagesFolderPath + pageName;
                //set timeout bedore deleting page on apache server (10 minutes)
                setTimeout(() => deleteHtmlPage(apacheServer, page), 600000);
                page = 'https://www.pawlaczyk.fr' + page;
                return res.status(201).json({url: page});
              });
            });
          });
        });
      });
    });
  }
  //TOTP is not valid
  else {
    return res.status(400).json({message: 'OTP KO'});
  }
};

//reset user password controller
exports.resetPassword = (req, res, next) => {
  console.log('RESET PASSWORD');
  const pagesFolderPath = '/emails/resetPassword/pages/';
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    User.findOne({email: req.body.email})
      .then((user) => {
        user.password = hash;
        deleteHtmlPage(apacheServer + pagesFolderPath, req.body.passwordPage);
        user.save()
        .then(() => res.status(200).json({message: 'Password update success'}))
        .catch(error => printAndReturnError(res, error, 400));
      });
    })
    .catch(error => printAndReturnError(res, error, 500));
};

/******************** USER CONTROLLER FUNCTIONS ********************/

//used to print error before return
function printAndReturnError(res, error, errorCode) {
  console.log(error);
  return res.status(errorCode).json({error});
}

//used to get the user data from database
function getUserData(res, mail, callback) {
  User.findOne({email: mail})
    .then(user => {
      if (user) {
        callback(user);
      }
      else {
        return res.status(400).json({message: 'User not found'});
      }
    })
    .catch(error => printAndReturnError(res, error, 500));
}

//used to get the require HTML template
function getTemplate(res, type, selectedLanguage, callback) {
  try {
    let path;
    if (type === 'resetEmail') {
      selectedLanguage === 'english' ? path = './emails/resetPassword/templates/resetLinkEmail_english.html' : path = './emails/resetPassword/templates/resetLinkEmail_french.html';
    }
    else if (type === 'resetPage') {
      selectedLanguage === 'english' ? path = './emails/resetPassword/templates/resetLinkPage_english.html' : path = './emails/resetPassword/templates/resetLinkPage_french.html'
    }
    else if (type === 'confirmEmail') {
      selectedLanguage === 'english' ? path = './emails/emailConfirmation/templates/confirmLinkEmail_english.html' : path = './emails/emailConfirmation/templates/confirmLinkEmail_french.html'
    }
    else if (type === 'confirmPage') {
      selectedLanguage === 'english' ? path = './emails/emailConfirmation/templates/confirmEmailLinkPage_english.html' : path = './emails/emailConfirmation/templates/confirmEmailLinkPage_french.html'
    }
    else if (type === 'otpPage') {
      selectedLanguage === 'english' ? path = './emails/resetPassword/templates/resetLinkOtp_english.html' : path = './emails/resetPassword/templates/resetLinkOtp_french.html'
    }
    fs.readFile(path, {encoding: 'utf-8'}, function (error, data) {
      if (error) throw error;
      callback(data);
    })
  }
  catch(error) {
    return printAndReturnError(res, error, 400);
  }
}

//used to get the email subject
function getEmailSubject(selectedLanguage, type) {
  let emailSubject;
  if (type === 'resetEmail') {
    selectedLanguage === 'english' ? emailSubject = 'Reset Password Link' : emailSubject = 'Restauration de mot de passe';
  }
  else if (type === 'confirmationEmail') {
    selectedLanguage === 'english' ? emailSubject = 'Email Confirmation' : emailSubject = "Confirmation d'adresse email";
  }
  return emailSubject;
}

//used to send email
function sendEmail(res, email, subject, address) {
  console.log('Send Email');
  const credentials = Security.getMailerCredentials();
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: credentials.user,
      pass: credentials.password
    }
  });
  const from = {
    name: 'Preview',
    address: 'donotreply@preview.com'
  }
  const mailOptions = {
    from: from,
    to: address,
    subject: subject,
    html: email,
    attachments: [{
      filename: 'logoWhiteUpdated.png',
      path: './images/logoWhiteUpdated.png',
      cid: 'unique@logo'
    }]
  };
  transporter.sendMail(mailOptions)
  .then(() => res.status(201).json({message: 'Mail send with success'}))
  .catch(error => printAndReturnError(res, error, 400));
}

//used to replace placeholder with user email
function replacePlaceholderWithUserEmail(pageTemplate, userEmail, callback) {
  pageTemplate = pageTemplate.replace('ID_SPAN', userEmail);
  callback(pageTemplate);
}

//used to replace placeholder with html page link
function replaceHrefWithPageLink(emailTemplate, pageName, link, callback) {
  const updatedLink = link + pageName;
  emailTemplate = emailTemplate.replace('HTML_LINK', updatedLink);
  callback(emailTemplate);
}

//function used to replace otp placeholder
function replaceOtpPlaceholder(emailTemplate, pageName, link, otp, callback) {
  const updatedLink = link + pageName;
  emailTemplate = emailTemplate.replace('HTML_LINK', updatedLink);
  emailTemplate = emailTemplate.replace('OTP_CODE', otp);
  callback(emailTemplate);
}

//used to create the html file on server based on the updated template
function createHtmlPage(res, pageName, content, callback) {
  try {
    fs.writeFile(pageName, content, function (error) {
      if (error) throw error;
      callback();
    });
  }
  catch(error) {
    return printAndReturnError(res, error, 400);
  }
}

//used to move html page on page folder
function moveHtmlPage(res, pageName, path, callback) {
  try {
    fs.rename('./'+pageName, path+pageName, function (error) {
      if (error) throw error;
      callback();
    })
  }
  catch(error) {
    console.log('Error with moveHtmlPage function : ', error);
    return printAndReturnError(res, error, 400);
  }
}

//used to delete html file
function deleteHtmlPage(path, file) {
  try {
    const page = path + file;
    if (fs.existsSync(page)) {
      fs.unlink(page, (error) => {
        if (error) throw error;
        console.log('Html page deleted');
      })
    }
    else {
      console.log('Html page not found');
    }
  }
  catch(error) {
    console.log('Error with deleteHtmlPage function : ', error);
  }
}

//used to create a random page name
function createNewPageName() {
  const namePart1 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const namePart2 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const namePart3 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const namePart4 = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let ret = namePart1 + namePart2 + namePart3 + namePart4 + '.html';
  return ret.replace('NaN', '');
}

//replace placeholder with page link
function replaceHrefWithConfirmEmailPageLink(emailTemplate, pageName, callback) {
  const updatedLink = 'https://www.pawlaczyk.fr:3001/emailConfirmation/pages/' + pageName;
  emailTemplate = emailTemplate.replace('HTML_LINK', updatedLink);
  callback(emailTemplate);
}
