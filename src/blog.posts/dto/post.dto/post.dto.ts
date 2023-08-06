import { Field, ObjectType } from '@nestjs/graphql';

export class PostDto {}

//  所有关联到最终生成 Graphql gql schema 的类型都需要声明@ObjectType
@ObjectType({ isAbstract: true, description: '分类' })
export class CategoryDto {
  name?: string;
  catid?: string;
  description?: string;
  relateCount?: number; // 数据库保存的字段是relate_count， 但是返回的字段是relateCount, 这里的定义一定要和返回的数据一致
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
  catid?: string;
}
