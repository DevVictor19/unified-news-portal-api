import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoDatabaseService } from './mongo-database.service';
import { IEnvConfigProvider } from '../../env-config/env-config-provider.interface';
import { EnvConfigModule } from '../../env-config/env-config.module';
import { IDatabaseService } from '../database-service.interface';

import {
  CategoryMongoEntity,
  CategoryMongoSchema,
} from '@/modules/categories/database/models/mongo/categories-mongo.model';
import {
  ClassMongoEntity,
  ClassMongoSchema,
} from '@/modules/classes/database/models/mongo/classes-mongo.model';
import {
  CourseMongoEntity,
  CourseMongoSchema,
} from '@/modules/courses/database/models/mongo/courses-mongo.model';
import {
  PostTypeMongoEntity,
  PostTypeMongoSchema,
} from '@/modules/post-types/database/models/mongo/post-types-mongo.model';
import {
  SubjectMongoEntity,
  SubjectMongoSchema,
} from '@/modules/subjects/database/models/mongo/subjects-mongo.model';
import {
  UserMongoEntity,
  UserMongoSchema,
} from '@/modules/users/database/models/mongo/users-mongo.model';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (envConfigProvider: IEnvConfigProvider) => ({
        uri: envConfigProvider.getDbHost(),
        autoIndex: true,
      }),
      inject: [IEnvConfigProvider],
      imports: [EnvConfigModule.forRoot()],
    }),
    MongooseModule.forFeature([
      { name: UserMongoEntity.name, schema: UserMongoSchema },
      { name: CategoryMongoEntity.name, schema: CategoryMongoSchema },
      { name: ClassMongoEntity.name, schema: ClassMongoSchema },
      { name: SubjectMongoEntity.name, schema: SubjectMongoSchema },
      { name: PostTypeMongoEntity.name, schema: PostTypeMongoSchema },
      { name: CourseMongoEntity.name, schema: CourseMongoSchema },
    ]),
  ],
  providers: [{ provide: IDatabaseService, useClass: MongoDatabaseService }],
  exports: [IDatabaseService],
})
export class MongoDatabaseModule {}
