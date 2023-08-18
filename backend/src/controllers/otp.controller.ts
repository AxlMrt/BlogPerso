import { NextFunction, Request, Response } from 'express';
import HttpException from '../config/exceptions/HttpException';
import { checkOTP } from '../utils/otp';
import { sendOTP } from '../utils/sendOTP';

const createOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, subject, message, duration } = req.body;
    const newOTP = sendOTP({ email, subject, message, duration });

    res.json(newOTP);
  } catch (error) {
    next(new HttpException(400, 'Failed to create and send OTP'));
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