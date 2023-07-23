import { Field, ObjectType } from '@nestjs/graphql';

export class PostDto {}

//  所有关联到最终生成 Graphql gql schema 的类型都需要声明@ObjectType
@ObjectType({ isAbstract: true, description: '分类' })
class CategoryDto {
  name?: string;
  catid?: string;
}
@ObjectType({ isAbstract: true, description: '专栏' })
class ColumnDto {
  name?: string;
  colid?: string;
}
@ObjectType({ isAbstract: true, description: '标签' })
class TagDto {
  name?: string;
  tagid?: string;
}
@ObjectType({ isAbstract: true, description: '接口最终返回的 文章结构' })
export class ArticleDto {
  artid: string;
  createdAt: Date;
  title: string;
  content?: string;
  category?: CategoryDto;
  tags?: TagDto[] | null;
  cover?: string;
  column?: ColumnDto;
  banner?: boolean;
  description?: string;
  password?: string;
  visible?: boolean;
  status?: number;
}
