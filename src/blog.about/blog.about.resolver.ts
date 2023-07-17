import { Resolver, Query } from '@nestjs/graphql';
import { AboutDTO } from './dto/about.dto/about.dto';
import { BlogAboutService } from './blog.about.service';

@Resolver()
export class BlogAboutResolver {
  constructor(private readonly blogAboutService: BlogAboutService) {}
  @Query(() => AboutDTO, { name: 'about', nullable: true })
  async findOne() {
    return this.blogAboutService.findOne();
  }
}
