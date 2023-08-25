import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(498, 'Invalid token.');
  }
}

export default WrongAuthenticationTokenException;
