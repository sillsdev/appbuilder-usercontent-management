import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
    SMTP_SERVER_ADDRESS,
    SMTP_SERVER_PORT,
    SMTP_SERVER_USERNAME,
    SMTP_SERVER_PASSWORD
} from '$env/static/private';

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
