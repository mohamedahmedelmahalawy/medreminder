export interface Patient {
  id?: number;                        // recommended for updates too
  email: string;
  name: string;
  phone: string;
  password: string;
  age?: number;
  country?: string;
  drCodes:string[]
}