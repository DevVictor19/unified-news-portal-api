import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import environment from './config/environment.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { ClassesModule } from './modules/classes/classes.module';
import { JwtModule } from './modules/common/jwt/jwt.module';
import { CoursesModule } from './modules/courses/courses.module';
import { PostTypesModule } from './modules/post-types/post-types.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [environment], isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.host'),
        autoIndex: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
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
