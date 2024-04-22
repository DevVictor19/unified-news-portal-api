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
import { PostTypesPresenter } from './presenters/post-types.presenter';
import {
  CreatePostTypesUseCase,
  SearchPostTypesUseCase,
  DeletePostTypesUseCase,
} from '../application/usecases';

import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { SearchQueryDto } from '@/common/infrastructure/nest/dtos/search-query.dto';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';

@Controller('/post-types')
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
  async searchPostTypes(@Query() dto: SearchQueryDto) {
    const results = await this.searchPostTypesUseCase.execute(dto);
    return this.formatCollection(results);
  }

  @Delete('/:postTypeId')
  @TeacherRoute()
  deletePostTypes(@Param('postTypeId', ParseUUIDPipe) postTypeId: string) {
    return this.deletePostTypesUseCase.execute({ postTypeId });
  }

  private formatCollection(input: CourseEntity[]) {
    return input.map((data) => PostTypesPresenter.format(data));
  }
}
