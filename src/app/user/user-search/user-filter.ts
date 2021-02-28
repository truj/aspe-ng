export class UserFilter {
  id?: number;
  userName?: string;
  realName?: string;
  email?: string;
  lastLoginMin?: Date;
  lastLoginMax?: Date;
  active: Active;

  constructor() {
    this.active = Active.all;
  }
}

enum Active {
  all      = 'all',
  active   = 'active',
  inactive = 'inactive',
}
