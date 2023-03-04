import { Account, Role } from '@prisma/client';

export class AccountEntity implements Account {
  id: string;
  username: string;
  password: string;
  phone: string;
  roleId: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
