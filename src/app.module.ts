import { Module } from '@nestjs/common';

import { CategoriesModule } from './modules/categories/categories.module';
import { ClassesModule } from './modules/classes/classes.module';
import { DatabaseModule } from './modules/common/database/database.module';
import { EnvConfigModule } from './modules/common/env-config/env-config.module';
import { JwtModule } from './modules/common/jwt/jwt.module';
import { CoursesModule } from './modules/courses/courses.module';
import { PostTypesModule } from './modules/post-types/post-types.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule.forRoot(),
    JwtModule,
    UsersModule,
    SubjectsModule,
    ClassesModule,
    CoursesModule,
    CategoriesModule,
    PostTypesModule,
  ],
})
export class AppModule {}
