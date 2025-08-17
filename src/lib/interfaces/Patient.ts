export interface Patient {
  id: number;                        // recommended for updates too
  username: string;
  name: string;
  phone: string;
  password: string;
  age?: number;
  country?: string;
}