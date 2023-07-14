import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export class Coffee {
  @Field(() => ID)
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
