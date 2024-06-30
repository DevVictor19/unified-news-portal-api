import { IsIn, IsNumber } from 'class-validator';

export class ChangeUserRoleDto {
  @IsNumber()
  @IsIn([0, 1, 2, 3, 4, 5])
  role: number;
}
