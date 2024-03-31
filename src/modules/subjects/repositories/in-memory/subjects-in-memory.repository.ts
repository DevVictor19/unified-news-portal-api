import { Subject } from '../../entities/subjects.entity';
import { ISubjectsRepository } from '../subjects-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export class SubjectsInMemoryRepository implements ISubjectsRepository {
  subjects: Subject[] = [];

  async insert(entity: Subject): Promise<void> {
    this.subjects.push(entity);
  }

  async search(params: RepositorySearch): Promise<Subject[]> {
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

  async findAll(): Promise<Subject[]> {
    return this.subjects;
  }

  async findByName(name: string): Promise<Subject | null> {
    const existentSubject = this.subjects.find((s) => s.name === name);

    if (!existentSubject) {
      return null;
    }

    return existentSubject;
  }

  async findById(id: string): Promise<Subject | null> {
    const existentSubject = this.subjects.find((s) => s._id === id);

    if (!existentSubject) {
      return null;
    }

    return existentSubject;
  }

  async update(id: string, entity: Subject): Promise<void> {
    const existentSubject = this.subjects.find((s) => s._id === id);

    if (!existentSubject) {
      return;
    }

    Object.assign(existentSubject, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedSubjects = this.subjects.filter((s) => s._id !== id);
    this.subjects = updatedSubjects;
  }
}
