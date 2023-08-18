import { NextFunction, Request, Response } from 'express';
import HttpException from '../config/exceptions/HttpException';
import { checkOTP, generateOTP } from '../utils/otp';
import secrets from '../config/secrets';
import sendEmail from '../utils/sendEmail';
import { hashData } from '../utils/hashData';
import path from 'path';

const createOTP = async (req: Request, res: Response) => {
  try {
    const { email, subject, message, duration } = req.body;
    if (!(email && subject && message))
      throw new HttpException(400, "No values provided");

    await prisma!.otp.deleteMany({
      where: {email}
    });

    const uploads = path.resolve(__dirname, '../../public/uploads');
    const generatedOTP = await generateOTP();
    const mailOptions = {
      from: secrets.authSecret,
      to: email,
      subject,
      html: `
      <!DOCTYPE html">
        <html lang="en">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Récupération de mot de passe</title>
          </head>

          <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
            <table role="presentation"
              style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
              <tbody>
                <tr>
                  <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                    <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                      <tbody>
                        <tr>
                          <td style="padding: 2rem;">
                            <div style="padding: 20px; background-color: rgb(255, 255, 255); box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; border-radius: .6rem;">
                              <div style="color: rgb(0, 0, 0); text-align: left; ">
                                <div style="display: flex; align-items: center; justify-content: center;">
                                  <img style="width:200px;" src="cid:unique@logo" alt="" />
                                </div>
                                <h1 style="margin: 2rem 0; text-align: center; color: black; font-size: 1.6rem; font-weight: bold;">Récupération de mot de passe</h1>
                                <div style="text-align: center; padding: 1rem 0; border: 1px solid black; border-style: dashed;">
                                  <p style="padding-bottom: 16px">Utilisez le code de vérification ci-dessous</p>
                                  <p><strong style="font-size: 130%">${generatedOTP}</strong></p>
                                </div>
                                <p style="margin: 2rem 0 1rem 0;">Si vous n'en avez pas fait la demande, vous pouvez ignorer cet email.</p>
                                <p>Merci pour votre confiance,<br>La Team M-A</p>
                              </div>
                            </div>
                            <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                              <p style="padding-bottom: 16px">Fait avec ♥ à Metz</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
          </html>`,
      attachments: [{
          filename: 'logo.png',
          path: `${uploads}/logo.png`,
          cid: 'unique@logo'
      }],
    }

    await sendEmail(mailOptions);
  
    const hashedOTP = await hashData(generatedOTP);
    const createdAt = new Date(Date.now());
    const expiresAt = new Date(Date.now() + 3600000 * +duration);

    const newOTP = await prisma!.otp.create({
      data: {
        email,
        otp: hashedOTP,
        createdAt,
        expiresAt,
     }
    });

    res.json(newOTP);
  } catch (error) {
    throw error;
  }
}

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { email, otp } = req.body;

    const validOTP = await checkOTP({ email, otp });
    res.json({ valid: validOTP });
  } catch (error: any) {
    next(new HttpException(400, error.message));
  }
}

const _ = {
  createOTP,
  verifyOTP
}

export default _;