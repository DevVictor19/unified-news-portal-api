import { Global, Module } from '@nestjs/common';

import { MongoDatabaseModule } from './mongo/mongo-database.module';

@Global()
@Module({
  imports: [MongoDatabaseModule],
  exports: [MongoDatabaseModule],
})
export class DatabaseModule {}
