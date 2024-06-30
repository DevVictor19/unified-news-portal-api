import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CreatePostTypesDto } from './dtos';
import {
  CreatePostTypesUseCase,
  SearchPostTypesUseCase,
  DeletePostTypesUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@Controller('/post-types')
@ProtectedRoute()
export class PostTypesController {
  constructor(
    private createPostTypesUseCase: CreatePostTypesUseCase,
    private searchPostTypesUseCase: SearchPostTypesUseCase,
    private deletePostTypesUseCase: DeletePostTypesUseCase,
  ) {}

  @Post('/')
  @LeaderRoute()
  createPostTypes(@Body() dto: CreatePostTypesDto) {
    return this.createPostTypesUseCase.execute(dto);
  }

  @Get('/')
  @StudentRoute()
  @UsePaginationQuery()
  searchPostTypes(@Query() dto: PaginationDto) {
    return this.searchPostTypesUseCase.execute(dto);
  }

  @Delete('/:postTypeId')
  @TeacherRoute()
  deletePostTypes(@Param('postTypeId', ParseUUIDPipe) postTypeId: string) {
    return this.deletePostTypesUseCase.execute({ postTypeId });
  }
}
