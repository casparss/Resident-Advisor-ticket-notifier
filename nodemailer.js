var nodemailer = require('nodemailer');
var generator = require('xoauth2').createXOAuth2Generator({
    user: '{username}',
    clientId: '{Client ID}',
    clientSecret: '{Client Secret}',
    refreshToken: '{refresh-token}',
    accessToken: '{cached access token}' // optional
});

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    	xoauth2: generator        
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'casparsambrooksmith@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});