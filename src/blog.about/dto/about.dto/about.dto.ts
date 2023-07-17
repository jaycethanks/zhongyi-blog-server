import { Field, ObjectType } from '@nestjs/graphql';
import { LinkDTO } from '../link.dto/link.dto';

@ObjectType({ isAbstract: true })
export class AboutDTO {
  @Field()
  avatar: string;
  msg: string;
  links: LinkDTO[] = [];
}
