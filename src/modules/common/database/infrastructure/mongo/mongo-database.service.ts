import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IDatabaseService } from '../../application/services/database-service.interface';

import { ICategoriesRepository } from '@/modules/categories/domain/repositories/categories-repository.interface';
import { CategoryMongoEntity } from '@/modules/categories/infrastructure/database/models/mongo/categories-mongo.model';
import { CategoriesMongoRepository } from '@/modules/categories/infrastructure/database/repositories/mongo/categories-mongo.repository';
import { IClassesRepository } from '@/modules/classes/domain/repositories/classes-repository.interface';
import { ClassMongoEntity } from '@/modules/classes/infrastrucutre/database/models/mongo/classes-mongo.model';
import { ClassesMongoRepository } from '@/modules/classes/infrastrucutre/database/repositories/mongo/classes-mongo.repository';
import { ICoursesRepository } from '@/modules/courses/domain/repositories/courses-repository.interface';
import { CourseMongoEntity } from '@/modules/courses/infrastructure/database/models/mongo/courses-mongo.model';
import { CoursesMongoRepository } from '@/modules/courses/infrastructure/database/repositories/mongo/courses-mongo.repository';
import { IPostTypesRepository } from '@/modules/post-types/domain/repositories/post-types-repository.interface';
import { PostTypeMongoEntity } from '@/modules/post-types/infrastructure/database/models/mongo/post-types-mongo.model';
import { PostTypesMongoRepository } from '@/modules/post-types/infrastructure/database/repositories/mongo/post-types-mongo.repository';
import { ISubjectsRepository } from '@/modules/subjects/domain/repositories/subjects-repository.interface';
import { SubjectMongoEntity } from '@/modules/subjects/infrastructure/database/models/mongo/subjects-mongo.model';
import { SubjectsMongoRepository } from '@/modules/subjects/infrastructure/database/repositories/mongo/subjects-mongo.repository';
import { IUsersRepository } from '@/modules/users/domain/repositories/users-repository.interface';
import { UserMongoEntity } from '@/modules/users/infrastructure/database/models/mongo/users-mongo.model';
import { UsersMongoRepository } from '@/modules/users/infrastructure/database/repositories/mongo/users-mongo.repository';

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
