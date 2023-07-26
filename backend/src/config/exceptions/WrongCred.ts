import HttpException from "./HttpException";

class WrongCredentials extends HttpException {
  constructor() {
    super(401, 'Wrong credentials.');
  }
}

export default WrongCredentials;