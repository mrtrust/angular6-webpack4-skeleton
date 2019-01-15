export interface IPayload {
  iss: {
    tokenKey: string,
    isFirstAuth: boolean,
    roleId: number,
    userId: number
  };
  iat: string;
  exp: string;
}
