import prisma from '@/prisma/lib/prisma';
import HttpException from '@/config/exceptions/HttpException';
import { IOtp, IOtpDetails, IUser } from '@/config/types';
import { hashData } from './hashData';
import { checkOTP, deleteOTP } from './otp';
import { sendOTP } from './sendOTP';

export const sendPasswordResetOTP = async (email: string) => {
  try {
    const user: IUser | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new HttpException(404, 'User not found');

    const otpDetails: IOtpDetails = {
      email,
      subject: 'Récupération de mot de passe',
      message: 'Entrez le code ci-dessous pour récupérer votre mot de passe',
      duration: 1,
    };

    const createdOTP: IOtp = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw new HttpException(500, 'Failed to send email to reset password: ' + error);
  }
};

export const resetUserPassword = async ({
  email,
  otp,
  newPassword,
}: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    const validOTP = await checkOTP({ email, otp });
    if (!validOTP) throw new HttpException(400, 'Invalid code passed. Check your inbox');

    if (newPassword.length < 6 || newPassword.length > 20) throw new HttpException(400, 'Password is too short.');

    const hashedPassword: string = await hashData(newPassword);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return await deleteOTP(email);
  } catch (error) {
    throw new HttpException(500, 'Cannot change password.');
  }
};
