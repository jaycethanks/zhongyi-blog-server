import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true, description: 'Coffee module' })
export class Coffee {
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
