import { PartialType } from '@nestjs/swagger';
import { CreateAdminArticleDto } from './create-admin.article.dto';

export class UpdateAdminArticleDto extends PartialType(CreateAdminArticleDto) {}
