import nodemailer from 'nodemailer';
import secrets from '../config/secrets';
import HttpException from '../config/exceptions/HttpException';
import { Options } from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        clientId: secrets.clientId,
        clientSecret: secrets.clientSecret,
  }
} as SMTPTransport.Options);

const sendEmail = async (mailOptions: Options) => {
  try {
    return await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
        resolve(info);
        }
      });
    });
  } catch (error) {
    throw new HttpException(500, 'Something went wrong: ' + error);
  }
}

export default sendEmail;