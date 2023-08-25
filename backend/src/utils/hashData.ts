import bcrypt from 'bcrypt';
import HttpException from '../config/exceptions/HttpException';

export const hashData = async (data: string | Buffer, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw new HttpException(500, 'Failed to hash data.');
  }
};

export const verifyHashData = async (unhashed: string | Buffer, hashed: string) => {
  try {
    const matched = await bcrypt.compare(unhashed, hashed);
    return matched;
  } catch (error) {
    throw new HttpException(500, 'Failed to compare data.');
  }
};
