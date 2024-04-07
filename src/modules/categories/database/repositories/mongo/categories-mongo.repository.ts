import { Model } from 'mongoose';

import { CategoryMongoEntityMapper } from '../../models/mongo/caregories-mongo-model.mapper';
import { CategoryMongoEntity } from '../../models/mongo/categories-mongo.model';
import { ICategoriesRepository } from '../categories-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { CategoryEntity } from '@/modules/categories/entities/categories.entity';

export class CategoriesMongoRepository implements ICategoriesRepository {
  constructor(private categoryModel: Model<CategoryMongoEntity>) {}

  async insert(entity: CategoryEntity): Promise<void> {
    const mongoEntity = CategoryMongoEntityMapper.toMongoEntity(entity);
    const createdCategory = new this.categoryModel(mongoEntity);
    await createdCategory.save();
  }

  async search({
    limitPerPage,
    pageNumber,
    searchTerm,
  }: RepositorySearch): Promise<CategoryEntity[]> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    if (searchTerm) {
      const results = await this.categoryModel
        .find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skipAmount)
        .limit(limitPerPage);

      return results.map((mongoEntity) =>
        CategoryMongoEntityMapper.toDomainEntity(mongoEntity),
      );
    }

    const results = await this.categoryModel
      .find()
      .skip(skipAmount)
      .limit(limitPerPage);

    return results.map((mongoEntity) =>
      CategoryMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findAll(): Promise<CategoryEntity[]> {
    const results = await this.categoryModel.find();
    return results.map((mongoEntity) =>
      CategoryMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const result = await this.categoryModel.findOne({ name });
    if (!result) return null;
    return CategoryMongoEntityMapper.toDomainEntity(result);
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const result = await this.categoryModel.findById(id);
    if (!result) return null;
    return CategoryMongoEntityMapper.toDomainEntity(result);
  }

  async update(id: string, entity: CategoryEntity): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.deleteOne({ _id: id });
  }
}
