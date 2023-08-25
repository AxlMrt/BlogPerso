import HttpException from "../config/exceptions/HttpException"
import { IOtp } from "../config/types";
import { verifyHashData } from "./hashData";

export const checkOTP = async ({ email, otp }: { email: string, otp: string}) => {
  try {
    if (!(email && otp)) {
      throw new HttpException(400, 'Please, provide value for email and otp.')
    }

    const matchedOTPrecord: IOtp | null | undefined = await prisma?.otp.findUnique({
      where: { email }
    });

    if (!matchedOTPrecord)
      throw new HttpException(404, 'No otp record found.');

    const { expiresAt } = matchedOTPrecord;

    if (expiresAt < new Date(Date.now())) {
      await prisma?.otp.delete({ where: { email } });
      throw new HttpException(403, 'Code has expired. Request for a new one.');
    }

    const hashedOTP: string = matchedOTPrecord.otp;
    const validOTP: boolean = await verifyHashData(otp, hashedOTP);

    return validOTP;
  } catch (error) {
    throw new HttpException(500, 'Failed to verify OTP.')
  }
}

export const deleteOTP = async (email: string) => {
  try {
    await prisma?.otp.findUnique({ where: { email } });
  } catch (error) {
    throw new HttpException(500, 'Cannot delete otp record.')
  }
}

export const generateOTP = async () => {
  try {
    const otp: string = `${Math.floor(1000 + Math.random() * 9000)}`;
    return otp;
  } catch (error) {
    throw new HttpException(500, 'Something went wrong');
  }
}