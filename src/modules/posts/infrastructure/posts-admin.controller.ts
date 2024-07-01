import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdatePostDto } from './dtos/update-post.dto';
import {
  DeleteAnyPostUseCase,
  UpdateAnyPostUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import { AdminRoute } from '@/common/infrastructure/nest/decorators/roles.decorator';

@ApiTags('Admin')
@Controller('admin/posts')
@ProtectedRoute()
@AdminRoute()
export class PostsAdminController {
  constructor(
    private deleteAnyPostUseCase: DeleteAnyPostUseCase,
    private updateAnyPostUseCase: UpdateAnyPostUseCase,
  ) {}

  @Delete(':post_id')
  delete(@Param('post_id', ParseUUIDPipe) post_id: string) {
    return this.deleteAnyPostUseCase.execute({ post_id });
  }

  @Put(':post_id')
  update(
    @Param('post_id', ParseUUIDPipe) post_id: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.updateAnyPostUseCase.execute({ post_id, payload: dto });
  }
}
