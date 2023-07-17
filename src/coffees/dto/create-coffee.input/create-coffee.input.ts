import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create coffee input object type.' }) // description 可选， 只是一个描述
// 如果没有 graphql CLI 插件， 这里的每个字段都必须使用 @Field 装饰器装饰
export class CreateCoffeeInput {
  @Field(() => String, { description: 'A new coffee name' })
  name: string;
  brand: string;
  flavors: string[];
}
