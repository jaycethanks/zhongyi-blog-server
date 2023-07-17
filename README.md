重新生成 prisma types
```
npx prisma generate
```

prisma migrate

npx prisma migrate dev --name 20230723


常见问题：
1. "GraphQLError: Type About must define one or more fields"
   我的做法是 给About中任意一个字段添加 @Field 装饰器，后就好了， 但是按道理说不需要的，因为我们有用 graphql cli 插件
   https://docs.nestjs.com/graphql/cli-plugin
   后来把 dist 目录删除， 重新启动项目，发现也ok了




