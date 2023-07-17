import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';

@Resolver() // @Resolver 装饰器将一个类标识为 resolver, 意味这这个类，现在应该被 nestjs 的 GraphQL 模块所收集分析
export class CoffeesResolver {
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return [];
  }
  @Query(() => Coffee, { name: 'coffee' })
  // 默认传入的参数 id 将会被解析为 string, 但是我们需要这个值是数字类型， 我们可以使用  ParseIntPipe 来解决这个问题
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return null;
  }

  // 这里设定 nullable: true 只是临时的，目的是让 graphql 能够 return null, 因为这里暂时没有实现逻辑
  @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return null;
  }
}
