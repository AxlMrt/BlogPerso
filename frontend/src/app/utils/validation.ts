export const isEmail = (email: string) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

export const validPassword = (password: string) =>
	/^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(password)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trimUserObject = (data: any) => {
		const asArray = Object.entries(data);
		const filtered = asArray.filter(([, value]) => value !== '');

	return Object.fromEntries(filtered);
}