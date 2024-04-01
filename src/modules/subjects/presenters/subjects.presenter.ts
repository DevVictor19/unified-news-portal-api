import { Subject } from '../entities/subjects.entity';

export class SubjectsPresenter {
  static format(input: Subject) {
    return {
      id: input._id,
      name: input.name,
      created_at: input.created_at,
    };
  }
}
