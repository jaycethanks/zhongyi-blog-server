import { PartialType } from '@nestjs/swagger';
import { CreateAdminAboutDto } from './create-admin.about.dto';

export class UpdateAdminAboutDto extends PartialType(CreateAdminAboutDto) {}
