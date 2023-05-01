import { Module } from '@nestjs/common';
//CONTROLLER
import { AppController } from './app.controller';

//SERVICES
import { UserService } from './user.service'
import { PrismaService } from './prisma.service'
import { PostService } from './post.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UserService, PrismaService, PostService],
})
export class AppModule { }
