import { IDatabaseService } from '../database-service.interface';

import { ICategoriesRepository } from '@/modules/categories/database/repositories/categories-repository.interface';
import { CategoriesInMemoryRepository } from '@/modules/categories/database/repositories/in-memory/categories-in-memory.repository';
import { IClassesRepository } from '@/modules/classes/database/repositories/classes-repository.interface';
import { ClassesInMemoryRepository } from '@/modules/classes/database/repositories/in-memory/classes-in-memory.repository';
import { ICoursesRepository } from '@/modules/courses/database/repositories/courses-repository.interface';
import { CoursesInMemoryRepository } from '@/modules/courses/database/repositories/in-memory/courses-in-memory.repository';
import { PostTypesInMemoryRepository } from '@/modules/post-types/database/repositories/in-memory/post-types-in-memory.repository';
import { IPostTypesRepository } from '@/modules/post-types/database/repositories/post-types-repository.interface';
import { SubjectsInMemoryRepository } from '@/modules/subjects/database/repositories/in-memory/subjects-in-memory.repository';
import { ISubjectsRepository } from '@/modules/subjects/database/repositories/subjects-repository.interface';
import { UsersInMemoryRepository } from '@/modules/users/database/repositories/in-memory/users-in-memory.repository';
import { IUsersRepository } from '@/modules/users/database/repositories/users-repository.interface';

export class DatabaseServiceMock implements IDatabaseService {
  public categories: ICategoriesRepository;
  public classes: IClassesRepository;
  public courses: ICoursesRepository;
  public postTypes: IPostTypesRepository;
  public subjects: ISubjectsRepository;
  public users: IUsersRepository;

  constructor() {
    this.categories = new CategoriesInMemoryRepository();
    this.classes = new ClassesInMemoryRepository();
    this.courses = new CoursesInMemoryRepository();
    this.postTypes = new PostTypesInMemoryRepository();
    this.subjects = new SubjectsInMemoryRepository();
    this.users = new UsersInMemoryRepository();
  }
}
