import HttpException from "../config/exceptions/HttpException"

export const generateOTP = async () => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    return otp;
  } catch (error) {
    throw new HttpException(500, 'Something went wrong');
  }
}