import nodemailer from 'nodemailer';
import secrets from '../config/secrets';
import HttpException from '../config/exceptions/HttpException';
import { Options } from 'nodemailer/lib/mailer';

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  auth: {
    user: secrets.authSecret,
    pass: secrets.passSecret
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log(success);
  }
});

const sendEmail = async (mailOptions: Options) => {
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw new HttpException(500, 'Something went wrong');
  }
}

export default sendEmail;