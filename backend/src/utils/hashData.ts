import bcrypt from 'bcrypt';
import HttpException from '../config/exceptions/HttpException';

export const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw new HttpException(500, 'Failed to hash data');
  }
}