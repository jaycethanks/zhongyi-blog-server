import { Field, ObjectType } from '@nestjs/graphql';

export class PostDto {}

@ObjectType({ isAbstract: true })
export class ArticleDto {
  artid: string;
  createdAt: Date;
  title: string;
  content?: string;
  category?: string;
  tags?: string[];
  cover?: string;
  column?: string;
  banner?: boolean;
  description?: string;
  password?: string;
  visible?: boolean;
  status?: number;
}
