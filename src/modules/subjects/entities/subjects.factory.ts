import { SubjectEntity, SubjectEntityProps } from './subjects.entity';

export class SubjectEntityFactory {
  create(props: SubjectEntityProps): SubjectEntity {
    return new SubjectEntity(props);
  }
}
