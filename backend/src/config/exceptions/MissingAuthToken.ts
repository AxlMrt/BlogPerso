import HttpException from './HttpException';

class MissingAuthenticationTokenException extends HttpException {
  constructor() {
    super(403, 'Missing token.');
  }
}

export default MissingAuthenticationTokenException;
