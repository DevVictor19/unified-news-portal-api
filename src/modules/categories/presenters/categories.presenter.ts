import { CategoryEntity } from '../entities/categories.entity';

export class CategoriesPresenter {
  static format(input: CategoryEntity) {
    return {
      id: input.id,
      name: input.name,
      created_at: input.created_at,
    };
  }
}
