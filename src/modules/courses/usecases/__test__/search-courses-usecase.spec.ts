import { ICoursesRepository } from '../../database/repositories/courses-repository.interface';
import { CoursesInMemoryRepository } from '../../database/repositories/in-memory/courses-in-memory.repository';
import { SearchCoursesUseCase } from '../search-courses.usecase';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';

describe('SearchCoursesUseCase unit tests', () => {
  let repository: ICoursesRepository;
  let sut: SearchCoursesUseCase;

  beforeEach(() => {
    repository = new CoursesInMemoryRepository();
    sut = new SearchCoursesUseCase(repository);
  });

  it('Should search for courses with the provided search params', async () => {
    const input: RepositorySearch = {
      limitPerPage: 10,
      pageNumber: 1,
      searchTerm: 'searchTerm',
    };

    const searchSpy = jest.spyOn(repository, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
