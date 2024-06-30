import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';

import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import {
  CreatePostUseCase,
  DeletePostUseCase,
  FindByIdPostUseCase,
  SearchPostsUseCase,
  UpdatePostUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  StudentRoute,
  TeacherRoute,
  ViceLeaderRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@Controller('posts')
@ProtectedRoute()
export class PostsController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private deletePostUseCase: DeletePostUseCase,
    private findByIdPostUseCase: FindByIdPostUseCase,
    private searchPostsUseCase: SearchPostsUseCase,
    private updatePostUseCase: UpdatePostUseCase,
  ) {}

  @Post()
  @ViceLeaderRoute()
  create(@Body() dto: CreatePostDto, @Req() req: any) {
    const user_id: string = req.user.userId;
    return this.createPostUseCase.execute({ payload: dto, user_id });
  }

  @Delete(':post_id')
  @TeacherRoute()
  delete(@Param('post_id') post_id: string, @Req() req: any) {
    const user_id: string = req.user.userId;
    return this.deletePostUseCase.execute({ post_id, user_id });
  }

  @Get(':post_id')
  @StudentRoute()
  findById(@Param('post_id') post_id: string) {
    return this.findByIdPostUseCase.execute({ post_id });
  }

  @Get()
  @StudentRoute()
  @UsePaginationQuery()
  search(@Query() dto: PaginationDto) {
    return this.searchPostsUseCase.execute(dto);
  }

  @Put(':post_id')
  @ViceLeaderRoute()
  update(
    @Param('post_id') post_id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: any,
  ) {
    const user_id: string = req.user.userId;
    return this.updatePostUseCase.execute({ post_id, payload: dto, user_id });
  }
}
