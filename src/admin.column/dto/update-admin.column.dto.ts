import { PartialType } from '@nestjs/swagger';
import { CreateAdminColumnDto } from './create-admin.column.dto';

export class UpdateAdminColumnDto extends PartialType(CreateAdminColumnDto) {}
