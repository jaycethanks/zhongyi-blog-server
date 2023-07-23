import { Context, Query, Resolver } from '@nestjs/graphql';
import { BlogPostsService } from './blog.posts.service';
import { ArticleDto } from './dto/post.dto/post.dto';

@Resolver()
export class BlogPostsResolver {
  constructor(private readonly blogPostsService: BlogPostsService) {}
  @Query(() => [ArticleDto], { name: 'recentPosts', nullable: true })
  async findMany(@Context() context) {
    // const uid = context.req.headers.uid;
    const uid = 'd70b49b6-3b81-4f40-9623-f1d836027042';
    return this.blogPostsService.findMany(uid);
  }
}