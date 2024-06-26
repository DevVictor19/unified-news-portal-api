import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import { CategoriesModule } from '@/modules/categories/infrastructure/categories.module';
import { ClassesModule } from '@/modules/classes/infrastrucutre/classes.module';
import { DatabaseTestModule } from '@/modules/common/database/infrastructure/database-test.module';
import { EnvConfigModule } from '@/modules/common/env-config/infrastructure/env-config.module';
import { JwtModule } from '@/modules/common/jwt/infrastructure/jwt.module';
import { CoursesModule } from '@/modules/courses/infrastructure/courses.module';
import { PostTypesModule } from '@/modules/post-types/infrastructure/post-types.module';
import { SubjectsModule } from '@/modules/subjects/infrastructure/subjects.module';
import { UsersModule } from '@/modules/users/infrastructure/users.module';

export async function createIntegrationTestAppSetup(): Promise<NestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [
      DatabaseTestModule,
      EnvConfigModule.forRoot(),
      JwtModule,
      UsersModule,
      SubjectsModule,
      ClassesModule,
      CoursesModule,
      CategoriesModule,
      PostTypesModule,
    ],
  }).compile();

  return moduleRef.createNestApplication<NestApplication>();
}
