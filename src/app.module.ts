import { Module } from '@nestjs/common';
//CONTROLLER
import { AppController } from './app.controller';

//SERVICES
import { UserService } from './user.service'
import { PrismaService } from './prisma.service'
import { PostService } from './post.service'
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController],
  providers: [UserService, PrismaService, PostService, CategoriesService],
})
export class AppModule { }
