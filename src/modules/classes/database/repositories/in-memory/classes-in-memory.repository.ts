import { IClassesRepository } from '../classes-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { ClassEntity } from '@/modules/classes/entities/classes.entity';

export class ClassesInMemoryRepository implements IClassesRepository {
  classes: ClassEntity[] = [];

  async insert(entity: ClassEntity): Promise<void> {
    this.classes.push(entity);
  }

  async search(params: RepositorySearch): Promise<ClassEntity[]> {
    const { limitPerPage, pageNumber, searchTerm } = params;
    const skipAmount = (pageNumber - 1) * limitPerPage;

    let results = this.classes;

    if (searchTerm) {
      results = this.classes.filter(({ name }) => name.includes(searchTerm));
    }

    const paginatedResults = results.slice(
      skipAmount,
      skipAmount + limitPerPage,
    );

    return paginatedResults;
  }

  async findAll(): Promise<ClassEntity[]> {
    return this.classes;
  }

  async findByName(name: string): Promise<ClassEntity | null> {
    const existentClass = this.classes.find((s) => s.name === name);

    if (!existentClass) {
      return null;
    }

    return existentClass;
  }

  async findById(id: string): Promise<ClassEntity | null> {
    const existentClass = this.classes.find((s) => s.id === id);

    if (!existentClass) {
      return null;
    }

    return existentClass;
  }

  async update(id: string, entity: ClassEntity): Promise<void> {
    const existentClass = this.classes.find((s) => s.id === id);

    if (!existentClass) {
      return;
    }

    Object.assign(existentClass, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedClasses = this.classes.filter((s) => s.id !== id);
    this.classes = updatedClasses;
  }
}
