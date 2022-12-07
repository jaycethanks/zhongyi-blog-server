import { PartialType } from '@nestjs/swagger';
import { CreateAdminTagDto } from './create-admin.tag.dto';

export class UpdateAdminTagDto extends PartialType(CreateAdminTagDto) {}
