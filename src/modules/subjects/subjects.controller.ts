import { Controller } from '@nestjs/common';

import ProtectedRoute from '@/common/decorators/protected-route.decorator';

@Controller('/subjects')
@ProtectedRoute()
export class SubjectsController {}
