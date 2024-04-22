import { ClassEntity } from '../../domain/entities/classes.entity';

export class ClassesPresenter {
  static format(input: ClassEntity) {
    return {
      id: input.id,
      name: input.name,
      created_at: input.created_at,
    };
  }
}
