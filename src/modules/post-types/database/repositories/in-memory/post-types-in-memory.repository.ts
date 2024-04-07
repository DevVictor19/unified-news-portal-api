import { IPostTypesRepository } from '../post-types-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';

export class PostTypesInMemoryRepository implements IPostTypesRepository {
  postTypes: PostTypeEntity[] = [];

  async insert(entity: PostTypeEntity): Promise<void> {
    this.postTypes.push(entity);
  }

  async search(params: RepositorySearch): Promise<PostTypeEntity[]> {
    const { limitPerPage, pageNumber, searchTerm } = params;
    const skipAmount = (pageNumber - 1) * limitPerPage;

    let results = this.postTypes;

    if (searchTerm) {
      results = this.postTypes.filter(({ name }) => name.includes(searchTerm));
    }

    const paginatedResults = results.slice(
      skipAmount,
      skipAmount + limitPerPage,
    );

    return paginatedResults;
  }

  async findAll(): Promise<PostTypeEntity[]> {
    return this.postTypes;
  }

  async findByName(name: string): Promise<PostTypeEntity | null> {
    const existentPostType = this.postTypes.find((s) => s.name === name);

    if (!existentPostType) {
      return null;
    }

    return existentPostType;
  }

  async findById(id: string): Promise<PostTypeEntity | null> {
    const existentPostType = this.postTypes.find((s) => s.id === id);

    if (!existentPostType) {
      return null;
    }

    return existentPostType;
  }

  async update(id: string, entity: PostTypeEntity): Promise<void> {
    const existentPostType = this.postTypes.find((s) => s.id === id);

    if (!existentPostType) {
      return;
    }

    Object.assign(existentPostType, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedPostTypes = this.postTypes.filter((s) => s.id !== id);
    this.postTypes = updatedPostTypes;
  }
}
