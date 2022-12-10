export class CreateAdminColumnDto {
  colid?: string;
  name: string;
  description: string;
  cover: string;
  visible: 1 | 0;
}
