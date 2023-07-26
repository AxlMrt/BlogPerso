import HttpException from "./HttpException";

class WrongCrendentials extends HttpException {
  constructor() {
    super(401, 'Wrong credentials.');
  }
}

export default WrongCrendentials;