import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
    SMTP_SERVER_ADDRESS,
    SMTP_SERVER_PORT,
    SMTP_SERVER_USERNAME,
    SMTP_SERVER_PASSWORD
} from '$env/static/private';

/* async function sendVerificationEmail(receiverEmail, verificationLink) {
    // create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'usercontenttest@gmail.com',
          pass: 'Thisisatest123!'
        }
    });
  
    // send mail with defined transport object
    let message = await transporter.sendMail({
        from: 'usercontenttest@gmail.com', // sender address
        to: receiverEmail, // list of receivers
        subject: "Email Verification", // Subject line
        text: "Click the link below to verify your email:", // plain text body
        html: `<b>Click <a href="${verificationLink}">here</a> to verify your email</b>`, // html body
      });
  
    console.log("Message sent to: %s", message.to);
  }

  sendVerificationEmail("receiver@example.com", "https://www.google.com/?client=safari&channel=mac_bm"); */

//   const transporter = nodemailer.createTransport({
//     host: 'localhost',
//     port: 1025,
//     auth: {
//         user: 'project.1',
//         pass: 'secret.1'
//     }
// });

const smtpConfig: SMTPTransport.Options = {
    host: SMTP_SERVER_ADDRESS,
    port: Number(SMTP_SERVER_PORT),
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD
    }
};
const transporter = nodemailer.createTransport(smtpConfig);

export default transporter;
