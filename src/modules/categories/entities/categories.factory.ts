import { CategoryEntity, CategoryEntityProps } from './categories.entity';

export class CategoryEntityFactory {
  create(props: CategoryEntityProps): CategoryEntity {
    return new CategoryEntity(props);
  }
}
