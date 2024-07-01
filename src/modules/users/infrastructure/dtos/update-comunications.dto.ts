import { ArrayNotEmpty, IsArray, IsIn } from 'class-validator';

import { COMUNICATIONS } from '@/common/domain/enums/comunications.enum';

export class UpdateComunicationsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsIn([Object.values(COMUNICATIONS)], { each: true })
  comunications: COMUNICATIONS[];
}
