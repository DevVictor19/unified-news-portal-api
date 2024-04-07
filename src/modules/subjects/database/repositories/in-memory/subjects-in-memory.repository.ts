import { ISubjectsRepository } from '../subjects-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';

export class SubjectsInMemoryRepository implements ISubjectsRepository {
  subjects: SubjectEntity[] = [];

  async insert(entity: SubjectEntity): Promise<void> {
    this.subjects.push(entity);
  }

  async search(params: RepositorySearch): Promise<SubjectEntity[]> {
    const { limitPerPage, pageNumber, searchTerm } = params;
    const skipAmount = (pageNumber - 1) * limitPerPage;

    let results = this.subjects;

    if (searchTerm) {
      results = this.subjects.filter(({ name }) => name.includes(searchTerm));
    }

    const paginatedResults = results.slice(
      skipAmount,
      skipAmount + limitPerPage,
    );

    return paginatedResults;
  }

  async findAll(): Promise<SubjectEntity[]> {
    return this.subjects;
  }

  async findByName(name: string): Promise<SubjectEntity | null> {
    const existentSubject = this.subjects.find((s) => s.name === name);

    if (!existentSubject) {
      return null;
    }

    return existentSubject;
  }

  async findById(id: string): Promise<SubjectEntity | null> {
    const existentSubject = this.subjects.find((s) => s.id === id);

    if (!existentSubject) {
      return null;
    }

    return existentSubject;
  }

  async update(id: string, entity: SubjectEntity): Promise<void> {
    const existentSubject = this.subjects.find((s) => s.id === id);

    if (!existentSubject) {
      return;
    }

    Object.assign(existentSubject, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedSubjects = this.subjects.filter((s) => s.id !== id);
    this.subjects = updatedSubjects;
  }
}
