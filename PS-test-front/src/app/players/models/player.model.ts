export interface Signin {
  amount: number;
  currency: string;
}

export interface Player {
  _id: string;
  name: string;
  position: string;
  thumbnail: string;
  signin: Signin;
  born: Date;
}
