import { IDatabaseService } from '../services/database-service.interface';

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
