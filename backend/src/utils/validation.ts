export const validEmail = (email: string) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

export const validPassword = (password: string) =>
  /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(password);

export const transformValuesToLowercase = (value: string, key: string): string => {
  if (key !== 'password' && key !== 'role' && typeof value === 'string') {
    return value.toLowerCase();
  }

  return value;
};
