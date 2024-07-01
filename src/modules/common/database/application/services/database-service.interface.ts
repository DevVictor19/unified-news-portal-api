import { ICategoriesRepository } from '@/modules/categories/domain/repositories/categories-repository.interface';
import { IClassesRepository } from '@/modules/classes/domain/repositories/classes-repository.interface';
import { ICoursesRepository } from '@/modules/courses/domain/repositories/courses-repository.interface';
import { IPostTypesRepository } from '@/modules/post-types/domain/repositories/post-types-repository.interface';
import { IPostsRepository } from '@/modules/posts/domain/repositories/posts-repository.interface';
import { ISubjectsRepository } from '@/modules/subjects/domain/repositories/subjects-repository.interface';
import { IUsersRepository } from '@/modules/users/domain/repositories/users-repository.interface';

export abstract class IDatabaseService {
  public categories: ICategoriesRepository;
  public classes: IClassesRepository;
  public courses: ICoursesRepository;
  public postTypes: IPostTypesRepository;
  public subjects: ISubjectsRepository;
  public users: IUsersRepository;
  public posts: IPostsRepository;
}
