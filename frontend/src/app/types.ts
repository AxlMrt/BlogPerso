export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photo: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  books: IBook[];
}

export interface IUserLogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface IRegister extends IUser {
  confirmPassword?: string;
  others: null;
  tokenData: { expiresIn: string, token: string };
  refreshTokenData: { expiresIn: string, token: string };
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  type: string;
  year: number;
  publisher: string;
  feedBack: number;
  isRead: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  userInfo: IUser;
}

export interface IBookRegister extends IBook {
  userMail: string;
}

export interface IBooksParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export type IsBookRead = {
		NOT_READ: {
			color: string;
			text: string;
		};
		IN_PROGRESS: {
			color: string;
			text: string;
		};
		IS_READ: {
			color: string;
			text: string;
		};
	};

export enum Read {
  IS_READ,
  IN_PROGRESS,
  NOT_READ
}

export interface IResetPassword { otp: string; newPassword: string; confirmPassword?: string; email: string; }
export interface RequestPassword { email: string; }