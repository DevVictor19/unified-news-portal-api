import { Module } from '@nestjs/common';

import { CategoriesModule } from './modules/categories/infrastructure/categories.module';
import { ClassesModule } from './modules/classes/infrastrucutre/classes.module';
import { DatabaseModule } from './modules/common/database/infrastructure/database.module';
import { EnvConfigModule } from './modules/common/env-config/infrastructure/env-config.module';
import { JwtModule } from './modules/common/jwt/infrastructure/jwt.module';
import { CoursesModule } from './modules/courses/infrastructure/courses.module';
import { PostTypesModule } from './modules/post-types/infrastructure/post-types.module';
import { SubjectsModule } from './modules/subjects/infrastructure/subjects.module';
import { UsersModule } from './modules/users/infrastructure/users.module';

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
