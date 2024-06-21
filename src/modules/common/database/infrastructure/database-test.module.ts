import { Global, Module } from '@nestjs/common';

import { MongoDatabaseTestModule } from './mongo/mongo-database-test.module';

@Global()
@Module({
  imports: [MongoDatabaseTestModule],
  exports: [MongoDatabaseTestModule],
})
export class DatabaseTestModule {}
