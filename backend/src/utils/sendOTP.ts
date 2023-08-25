import path from "path";
import prisma from "../../prisma/lib/prisma";
import HttpException from "../config/exceptions/HttpException";
import { hashData } from "./hashData";
import { generateOTP } from "./otp";
import sendEmail from "./sendEmail";
import { passwordMailConfig } from "../config/mail_config/passwordMailConfig";
import { IOtp, IOtpDetails } from "../config/types";

export const sendOTP = async ({ email, subject, message, duration = 1}: IOtpDetails) => {
  try {
    if (!(email && subject && message))
      throw new HttpException(400, "No values provided");

    await prisma!.otp.deleteMany({
      where: {email}
    });

    const uploads: string = path.resolve(__dirname, '../../public/uploads');
    const generatedOTP: string = await generateOTP();

    await sendEmail(passwordMailConfig({email, subject, generatedOTP, uploads}));
  
    const hashedOTP: string = await hashData(generatedOTP);
    const createdAt: Date = new Date(Date.now());
    const expiresAt: Date = new Date(Date.now() + 3600000 * +duration);

    const newOTP: IOtp = await prisma!.otp.create({
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