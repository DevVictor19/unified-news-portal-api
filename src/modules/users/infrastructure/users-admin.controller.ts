import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ChangeUserRoleDto, CreateUserDto } from './dtos';
import {
  ChangeUserRoleUseCase,
  CreateUserUseCase,
  DeleteUserUseCase,
  FindByIdUserUseCase,
  SearchUsersUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import { AdminRoute } from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@Controller('admin/users')
@ProtectedRoute()
@AdminRoute()
export class UsersAdminController {
  constructor(
    private changeUserRoleUseCase: ChangeUserRoleUseCase,
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private findByIdUserUseCase: FindByIdUserUseCase,
    private searchUsersUseCase: SearchUsersUseCase,
  ) {}

  @Patch(':user_id/role')
  changeRole(
    @Body() dto: ChangeUserRoleDto,
    @Param('user_id', ParseUUIDPipe) user_id: string,
  ) {
    return this.changeUserRoleUseCase.execute({
      role: dto.role,
      user_id,
    });
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Delete(':user_id')
  delete(@Param('user_id', ParseUUIDPipe) user_id: string) {
    return this.deleteUserUseCase.execute({ user_id });
  }

  @Get(':user_id')
  findById(@Param('user_id', ParseUUIDPipe) user_id: string) {
    return this.findByIdUserUseCase.execute({ user_id });
  }

  @Get()
  @UsePaginationQuery()
  search(@Query() dto: PaginationDto) {
    return this.searchUsersUseCase.execute(dto);
  }
}
