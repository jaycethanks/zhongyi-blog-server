export class CreateAdminArticleDto {
  artid?: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  cover: string;
  column: string;
  isbanner: boolean;
  description: string;
  password: string;
  visible: boolean;
}
