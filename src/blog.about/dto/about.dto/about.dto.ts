import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class AboutDTO {
  avatar?: string;
  msg?: string;
  links?: string;
}
