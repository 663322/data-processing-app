const mailer = require("nodemailer");
require("dotenv").config();
 
module.exports = (email, name, comment, excel) => {
    const smtpTransport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        },
        tls:{
            rejectUnauthorized: false,
        }
    });
    
    const mail = {
        from: `${name}<${email}>`,
        to: 'evere99@yandex.com',
        subject: `${name} sent excel`,
        text: `${name} with email ${email}
        sent this file with problem: ${comment}`,
}
    
    if(excel){
        console.log(excel);
        mail.attachments = [];
        mail.attachments.push({
            filename: excel.originalname,
            content: excel.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}