import { Module } from '@nestjs/common';

import { SubjectsController } from './subjects.controller';

@Module({
  controllers: [SubjectsController],
})
export class SubjectsModule {}
