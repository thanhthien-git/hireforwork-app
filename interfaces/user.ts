export interface ICareer {
  careerFirstName: string;
  lastName: string;
  careerEmail: string;
  careerPhone: string;
  careerPicture?: string;
  languages?: string[];
  password: string;
  role?: string;
}

export interface JWTPayload {
  username: string;
  role: string;
  exp: number;
  iat: number;
  sub: string;
}
