import { ICategoriesRepository } from '../categories-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { CategoryEntity } from '@/modules/categories/entities/categories.entity';

export class CategoriesInMemoryRepository implements ICategoriesRepository {
  categories: CategoryEntity[] = [];

  async insert(entity: CategoryEntity): Promise<void> {
    this.categories.push(entity);
  }

  async search(params: RepositorySearch): Promise<CategoryEntity[]> {
    const { limitPerPage, pageNumber, searchTerm } = params;
    const skipAmount = (pageNumber - 1) * limitPerPage;

    let results = this.categories;

    if (searchTerm) {
      results = this.categories.filter(({ name }) => name.includes(searchTerm));
    }

    const paginatedResults = results.slice(
      skipAmount,
      skipAmount + limitPerPage,
    );

    return paginatedResults;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const existentCategory = this.categories.find((s) => s.name === name);

    if (!existentCategory) {
      return null;
    }

    return existentCategory;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const existentCategory = this.categories.find((s) => s.id === id);

    if (!existentCategory) {
      return null;
    }

    return existentCategory;
  }

  async update(id: string, entity: CategoryEntity): Promise<void> {
    const existentCategory = this.categories.find((s) => s.id === id);

    if (!existentCategory) {
      return;
    }

    Object.assign(existentCategory, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedCategories = this.categories.filter((s) => s.id !== id);
    this.categories = updatedCategories;
  }
}
