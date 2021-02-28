export interface User {
  id?: number;
  userName: string;
  realName: string;
  email: string;
  lastLogin?: Date;
  active?: boolean;
}
