import { SubjectEntity } from '../../domain/entities/subjects.entity';

export class SubjectsPresenter {
  static format(input: SubjectEntity) {
    return {
      id: input.id,
      name: input.name,
      created_at: input.created_at,
    };
  }
}
