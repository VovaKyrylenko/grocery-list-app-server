export interface IUser {
  _id: string;
  email: string;
  password: string;
}

export interface IGroceryItem {
  _id: string;
  name: string;
  amount: number;
  bought: boolean;
  userId: string;
  createdAt: Date;
}

export interface ICreateGroceryItemInput {
  name: string;
  amount: number;
}

export interface IUpdateGroceryItemInput {
  name?: string;
  amount?: number;
  bought?: boolean;
}
