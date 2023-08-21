import nodemailer from 'nodemailer';
import secrets from '../config/secrets';
import HttpException from '../config/exceptions/HttpException';
import { Options } from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: secrets.authSecret,
      clientId: secrets.clientId,
      clientSecret: secrets.clientSecret,
      accessToken: secrets.accessToken,
      refreshToken: secrets.refreshToken,
    }
  } );

const sendEmail = async (mailOptions: Options) => {
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw new HttpException(500, 'Something went wrong');
  }
}

export default sendEmail;