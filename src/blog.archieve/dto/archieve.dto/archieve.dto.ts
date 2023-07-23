import { ArticleDto } from '@/blog.posts/dto/post.dto/post.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true, description: '接口最终返回的 归档数据结构' })
export class ArchieveDto {
  year: string;
  posts: ArticleDto[] | null;
}
