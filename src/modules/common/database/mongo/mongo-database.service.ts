import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IDatabaseService } from '../database-service.interface';

import { CategoryMongoEntity } from '@/modules/categories/database/models/mongo/categories-mongo.model';
import { ICategoriesRepository } from '@/modules/categories/database/repositories/categories-repository.interface';
import { CategoriesMongoRepository } from '@/modules/categories/database/repositories/mongo/categories-mongo.repository';
import { ClassMongoEntity } from '@/modules/classes/database/models/mongo/classes-mongo.model';
import { IClassesRepository } from '@/modules/classes/database/repositories/classes-repository.interface';
import { ClassesMongoRepository } from '@/modules/classes/database/repositories/mongo/classes-mongo.repository';
import { CourseMongoEntity } from '@/modules/courses/database/models/mongo/courses-mongo.model';
import { ICoursesRepository } from '@/modules/courses/database/repositories/courses-repository.interface';
import { CoursesMongoRepository } from '@/modules/courses/database/repositories/mongo/courses-mongo.repository';
import { PostTypeMongoEntity } from '@/modules/post-types/database/models/mongo/post-types-mongo.model';
import { PostTypesMongoRepository } from '@/modules/post-types/database/repositories/mongo/post-types-mongo.repository';
import { IPostTypesRepository } from '@/modules/post-types/database/repositories/post-types-repository.interface';
import { SubjectMongoEntity } from '@/modules/subjects/database/models/mongo/subjects-mongo.model';
import { SubjectsMongoRepository } from '@/modules/subjects/database/repositories/mongo/subjects-mongo.repository';
import { ISubjectsRepository } from '@/modules/subjects/database/repositories/subjects-repository.interface';
import { UserMongoEntity } from '@/modules/users/database/models/mongo/users-mongo.model';
import { UsersMongoRepository } from '@/modules/users/database/repositories/mongo/users-mongo.repository';
import { IUsersRepository } from '@/modules/users/database/repositories/users-repository.interface';

@Injectable()
export class MongoDatabaseService
  implements IDatabaseService, OnApplicationBootstrap
{
  public categories: ICategoriesRepository;
  public classes: IClassesRepository;
  public courses: ICoursesRepository;
  public postTypes: IPostTypesRepository;
  public subjects: ISubjectsRepository;
  public users: IUsersRepository;

  constructor(
    @InjectModel(CategoryMongoEntity.name)
    private categoriesModel: Model<CategoryMongoEntity>,

    @InjectModel(ClassMongoEntity.name)
    private classesModel: Model<ClassMongoEntity>,

    @InjectModel(CourseMongoEntity.name)
    private coursesModel: Model<CourseMongoEntity>,

    @InjectModel(PostTypeMongoEntity.name)
    private postTypesModel: Model<PostTypeMongoEntity>,

    @InjectModel(SubjectMongoEntity.name)
    private subjectsModel: Model<SubjectMongoEntity>,

    @InjectModel(UserMongoEntity.name)
    private usersModel: Model<UserMongoEntity>,
  ) {}

  onApplicationBootstrap() {
    this.categories = new CategoriesMongoRepository(this.categoriesModel);
    this.classes = new ClassesMongoRepository(this.classesModel);
    this.courses = new CoursesMongoRepository(this.coursesModel);
    this.postTypes = new PostTypesMongoRepository(this.postTypesModel);
    this.subjects = new SubjectsMongoRepository(this.subjectsModel);
    this.users = new UsersMongoRepository(this.usersModel);
  }
}
