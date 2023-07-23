import { InputType } from '@nestjs/graphql';

@InputType({ description: '用于归档每个年份下加载更多按钮.' }) // description 可选， 只是一个描述
export class ArchieveAppendInput {
  year: string;
  size: number;
  start: number;
}
