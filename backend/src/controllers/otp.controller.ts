import { NextFunction, Request, Response } from 'express';
import { IOtp } from '@/config/types';
import { checkOTP } from '@/utils/otp';
import { sendOTP } from '@/utils/sendOTP';
import HttpException from '@/config/exceptions/HttpException';

const createOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, subject, message, duration } = req.body;

    if (!Number(duration)) next(new HttpException(400, 'Invalid value'));

    const newOTP: IOtp = await sendOTP({ email, subject, message, duration });

    res.json(newOTP);
  } catch (error) {
    next(new HttpException(400, 'Failed to create and send OTP'));
  }
};

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;

    const validOTP = await checkOTP({ email, otp });
    res.json({ valid: validOTP });
  } catch (error) {
    next(new HttpException(400, (error as Error).message));
  }
};

const _ = {
  createOTP,
  verifyOTP,
};

export default _;
