import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service'
import { PostService } from './post.service'
import { User as UserModelPrisma, Post as PostModelPrisma } from '@prisma/client'


@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) { }

  /* 
  ROTAS DO POST
  */

  @Get('draft/:id')
  async getPostById(@Param('id') id: string): Promise<PostModelPrisma> {
    return this.postService.post({ id: Number(id) })
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModelPrisma[]> {
    return this.postService.posts({ where: { published: true } })
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string
  ): Promise<PostModelPrisma[]> {
    return this.postService.posts({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } }
        ]
      }
    })
  }


/* 
export type Post = {
  id: number
  title: string
  content: string | null
  published: boolean | null
  createdAt: Date
  authorId: number | null
}
*/



  @Post('draft')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorId: number },
  ): Promise<PostModelPrisma> {
    const { title, content, authorId } = postData;
    return this.postService.createPost({
      title,
      content,
      authorId,
      createdAt: new Date()
    });
  }


  @Put('publish/:id')
  async publishPost(
    @Param('id') id: string
  ): Promise<PostModelPrisma> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true }
    })
  }

  @Delete('post/:id')
  async deletePost(
    @Param('id') id: string
  ): Promise<PostModelPrisma> {
    return this.postService.deletePost({ id: Number(id) })
  }


  /* 
  ROTAS DO USER
  */

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string, email: string }
  ): Promise<UserModelPrisma> {
    return this.userService.createUser(userData)
  }


  @Get('user')
  async listUsers(): Promise<UserModelPrisma[]> {
    return this.userService.users({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  
  // @Delete('user/:id')
  // async deleteAnUser(
  //   @Param('id') id: string
  // ): Promise<UserModelPrisma | any> {
  //   // return this.userService.deleteUser({ id: Number(id) })
  //   @Res.status(HttpStatus.ACCEPTED).json({
  //     "message": "item deleted"
  //   })
  // }


}