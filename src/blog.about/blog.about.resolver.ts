import { Resolver, Query, Context, Info } from '@nestjs/graphql';
import { AboutDTO } from './dto/about.dto/about.dto';
import { BlogAboutService } from './blog.about.service';
import { ContextType, Req } from '@nestjs/common';

@Resolver()
export class BlogAboutResolver {
  constructor(private readonly blogAboutService: BlogAboutService) {}
  @Query(() => AboutDTO, { name: 'about', nullable: true })
  async findOne(@Context() context) {
    const uid = context.req.headers.uid;
    return this.blogAboutService.findOne(uid);
  }
}
