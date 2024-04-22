import { IDatabaseService } from '../../application/services/database-service.interface';

import { ICategoriesRepository } from '@/modules/categories/domain/repositories/categories-repository.interface';
import { CategoriesInMemoryRepository } from '@/modules/categories/infrastructure/database/repositories/in-memory/categories-in-memory.repository';
import { IClassesRepository } from '@/modules/classes/domain/repositories/classes-repository.interface';
import { ClassesInMemoryRepository } from '@/modules/classes/infrastrucutre/database/repositories/in-memory/classes-in-memory.repository';
import { ICoursesRepository } from '@/modules/courses/domain/repositories/courses-repository.interface';
import { CoursesInMemoryRepository } from '@/modules/courses/infrastructure/database/repositories/in-memory/courses-in-memory.repository';
import { IPostTypesRepository } from '@/modules/post-types/domain/repositories/post-types-repository.interface';
import { PostTypesInMemoryRepository } from '@/modules/post-types/infrastructure/database/repositories/in-memory/post-types-in-memory.repository';
import { ISubjectsRepository } from '@/modules/subjects/domain/repositories/subjects-repository.interface';
import { SubjectsInMemoryRepository } from '@/modules/subjects/infrastructure/database/repositories/in-memory/subjects-in-memory.repository';
import { IUsersRepository } from '@/modules/users/domain/repositories/users-repository.interface';
import { UsersInMemoryRepository } from '@/modules/users/infrastructure/database/repositories/in-memory/users-in-memory.repository';

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
