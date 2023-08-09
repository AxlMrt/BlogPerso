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
}

export interface IRegister extends IUser {
  confirmPassword?: string;
}

export interface IBook {
	[x: string]: any;
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
  user: IUser;
}

export interface IBookRegister extends IBook {
  userMail: string;
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

export type BookData = IBook;
export type SortKeys = keyof BookData;
export type SortOrder = 'ascn' | 'desc';