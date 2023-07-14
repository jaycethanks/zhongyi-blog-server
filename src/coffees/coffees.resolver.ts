import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';

@Resolver() // @Resolver 装饰器将一个类标识为 resolver, 意味这这个类，现在应该被 nestjs 的 GraphQL 模块所收集分析
export class CoffeesResolver {
  @Query(() => [Coffee,{name:'coffees'} ])
  async findAll() {
    return [];
  }
}
