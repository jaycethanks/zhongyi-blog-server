import { ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class LinkDTO {
  icon: string;
  url: string;
  title: string;
}
