import { ICategoriesRepository } from '@/modules/categories/database/repositories/categories-repository.interface';
import { IClassesRepository } from '@/modules/classes/database/repositories/classes-repository.interface';
import { ICoursesRepository } from '@/modules/courses/database/repositories/courses-repository.interface';
import { IPostTypesRepository } from '@/modules/post-types/database/repositories/post-types-repository.interface';
import { ISubjectsRepository } from '@/modules/subjects/database/repositories/subjects-repository.interface';
import { IUsersRepository } from '@/modules/users/database/repositories/users-repository.interface';

export abstract class IDatabaseService {
  public categories: ICategoriesRepository;
  public classes: IClassesRepository;
  public courses: ICoursesRepository;
  public postTypes: IPostTypesRepository;
  public subjects: ISubjectsRepository;
  public users: IUsersRepository;
}
