import path from "path";
import prisma from "../../prisma/lib/prisma";
import HttpException from "../config/exceptions/HttpException";
import { hashData } from "./hashData";
import { generateOTP } from "./otp";
import sendEmail from "./sendEmail";
import { passwordMailConfig } from "../config/mail_config/passwordMailConfig";

export const sendOTP = async ({ email, subject, message, duration = 1}: {email: string, subject: string, message: string, duration: number}) => {
  try {
    if (!(email && subject && message))
      throw new HttpException(400, "No values provided");

    await prisma!.otp.deleteMany({
      where: {email}
    });

    const uploads = path.resolve(__dirname, '../../public/uploads');
    const generatedOTP = await generateOTP();

    await sendEmail(passwordMailConfig({email, subject, generatedOTP, uploads}));
  
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

    return newOTP;
  } catch (error) {
    throw new HttpException(500, "Failed to send OTP: " + error);
  }
}