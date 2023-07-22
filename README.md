重新生成 prisma types

```
npx prisma generate
```

prisma migrate

npx prisma migrate dev --name 20230723

常见问题：

1. "GraphQLError: Type About must define one or more fields"
   我的做法是 给 About 中任意一个字段添加 @Field 装饰器，后就好了， 但是按道理说不需要的，因为我们有用 graphql cli 插件
   https://docs.nestjs.com/graphql/cli-plugin
   后来把 dist 目录删除， 重新启动项目，发现也 ok 了

关于 @nestjs/grapnql 插件的说明
https://docs.nestjs.com/graphql/cli-plugin#using-the-cli-plugin

> The GraphQL plugin will automatically:

annotate all input object, object type and args classes properties with @Field unless @HideField is used
set the nullable property depending on the question mark (e.g. name?: string will set nullable: true)
set the type property depending on the type (supports arrays as well)
generate descriptions for properties based on comments (if introspectComments set to true)
Please, **note that your filenames must have one of the following suffixes in order to be analyzed by the plugin: ['.input.ts', '.args.ts', '.entity.ts', '.model.ts'] (e.g., author.entity.ts).** If you are using a different suffix, you can adjust the plugin's behavior by specifying the typeFileNameSuffix option (see below).
