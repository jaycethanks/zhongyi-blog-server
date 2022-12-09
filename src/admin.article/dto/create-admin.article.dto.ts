export class CreateAdminArticleDto {
  artid?: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  cover: string;
  column: string;
  banner: 1 | 0;
  description: string;
  password: string;
  visible: 1 | 0;
  status: 0 | 1 | 2;
}
