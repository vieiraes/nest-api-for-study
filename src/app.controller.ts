import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
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

  @Get('post/:id')
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

  @Post('post')
  async createDraft(
    @Body() postData: { title: string, content?: string, authorEmail: string }
  ): Promise<PostModelPrisma> {
    const { title, content, authorEmail } = postData
    return this.postService.createPost({
      title: title,
      content: content,
      author: {
        connect: { email: authorEmail }
      }
    })

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
        id: 'asc'
      }
    })
  }


}