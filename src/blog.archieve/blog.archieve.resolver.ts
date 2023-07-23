import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { BlogArchieveService } from './blog.archieve.service';
import { ArchieveDto } from './dto/archieve.dto/archieve.dto';
import { ArticleDto } from '@/blog.posts/dto/post.dto/post.dto';
import { ArchieveAppendInput } from './dto/archieve-append.input/archieve-append.input.ts/archieve-append.input.ts';

@Resolver()
export class BlogArchieveResolver {
  constructor(private readonly blogArchieveService: BlogArchieveService) {}
  @Query(() => [ArchieveDto], { name: 'archieves', nullable: true })
  async findMany(@Context() context, @Args('perMaxSize') perMaxSize: number) {
    // const uid = 'd70b49b6-3b81-4f40-9623-f1d836027042';
    const uid = context.req.headers.uid;
    return this.blogArchieveService.findMany(uid, perMaxSize);
  }

  @Query(() => [ArticleDto], { name: 'queryMore', nullable: true })
  async queryMore(
    @Context() context,
    @Args('pageInfo') archieveAppendInput: ArchieveAppendInput,
  ) {
    // const uid = context.req.headers.uid;
    const uid = 'd70b49b6-3b81-4f40-9623-f1d836027042';

    return this.blogArchieveService.queryMore(archieveAppendInput, uid);
  }
}
