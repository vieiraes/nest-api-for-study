import { Module } from '@nestjs/common';
//CONTROLLER


//SERVICES


//MODULES
import { WalletsModule } from './wallets/wallets.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [WalletsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
