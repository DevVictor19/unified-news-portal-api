import { Model } from 'mongoose';

import { PostTypeMongoEntityMapper } from '../../models/mongo/post-types-mongo-model.mapper';
import { PostTypeMongoEntity } from '../../models/mongo/post-types-mongo.model';
import { IPostTypesRepository } from '../post-types-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';

export class PostTypesMongoRepository implements IPostTypesRepository {
  constructor(private postTypeModel: Model<PostTypeMongoEntity>) {}

  async insert(entity: PostTypeEntity): Promise<void> {
    const mongoEntity = PostTypeMongoEntityMapper.toMongoEntity(entity);
    const createdPostType = new this.postTypeModel(mongoEntity);
    await createdPostType.save();
  }

  async search({
    limitPerPage,
    pageNumber,
    searchTerm,
  }: RepositorySearch): Promise<PostTypeEntity[]> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    if (searchTerm) {
      const results = await this.postTypeModel
        .find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skipAmount)
        .limit(limitPerPage);

      return results.map((mongoEntity) =>
        PostTypeMongoEntityMapper.toDomainEntity(mongoEntity),
      );
    }

    const results = await this.postTypeModel
      .find()
      .skip(skipAmount)
      .limit(limitPerPage);

    return results.map((mongoEntity) =>
      PostTypeMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findAll(): Promise<PostTypeEntity[]> {
    const results = await this.postTypeModel.find();
    return results.map((mongoEntity) =>
      PostTypeMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findByName(name: string): Promise<PostTypeEntity | null> {
    const result = await this.postTypeModel.findOne({ name });
    if (!result) return null;
    return PostTypeMongoEntityMapper.toDomainEntity(result);
  }

  async findById(id: string): Promise<PostTypeEntity | null> {
    const result = await this.postTypeModel.findById(id);
    if (!result) return null;
    return PostTypeMongoEntityMapper.toDomainEntity(result);
  }

  async update(id: string, entity: PostTypeEntity): Promise<void> {
    await this.postTypeModel.findByIdAndUpdate(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.postTypeModel.deleteOne({ _id: id });
  }
}
