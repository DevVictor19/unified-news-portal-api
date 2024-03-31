import { Subject } from './subjects.entity';

export type CreateSubjectProps = {
  name: string;
};

export class SubjectsFactory {
  create(props: CreateSubjectProps): Subject {
    const subject = new Subject();
    Object.assign(subject, props);
    return subject;
  }
}
