import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findUserName(username: string): Promise<Account> {
    return this.prisma.account.findFirst({
      where: { username: username },
      include: { role: true },
    });
  }
}
