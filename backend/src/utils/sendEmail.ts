import nodemailer from 'nodemailer';
import secrets from '../config/secrets';
import HttpException from '../config/exceptions/HttpException';
import { Options } from 'nodemailer/lib/mailer';
import { google } from "googleapis";
import SMTPTransport from 'nodemailer/lib/smtp-transport';
const OAuth2 = google.auth.OAuth2;


const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    secrets.clientId,
    secrets.clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: secrets.refreshToken
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: secrets.authSecret,
      accessToken,
      clientId: secrets.clientId,
      clientSecret: secrets.clientSecret,
      refreshToken: secrets.refreshToken
    }
  } as SMTPTransport.Options);

  return transporter;
};


const sendEmail = async (mailOptions: Options) => {
  try {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw new HttpException(500, 'Something went wrong');
  }
}

export default sendEmail;