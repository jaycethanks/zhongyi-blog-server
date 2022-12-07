import { PartialType } from '@nestjs/swagger';
import { CreateAdminContentDto } from './create-admin.content.dto';

export class UpdateAdminContentDto extends PartialType(CreateAdminContentDto) {}
