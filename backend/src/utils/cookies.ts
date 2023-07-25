import { ITokenData } from "../config/types";

const createCookie = (tokenData: ITokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

export default createCookie;