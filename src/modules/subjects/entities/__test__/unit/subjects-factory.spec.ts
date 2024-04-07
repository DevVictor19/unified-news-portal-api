import { SubjectEntityProps } from '../../subjects.entity';
import { SubjectEntityFactory } from '../../subjects.factory';

describe('SubjectsFactory unit tests', () => {
  let sut: SubjectEntityFactory;
  let subjectProps: SubjectEntityProps;

  beforeEach(() => {
    sut = new SubjectEntityFactory();

    subjectProps = {
      name: 'subject name',
    };
  });

  it('Should create a subject with all provided props', () => {
    const subject = sut.create(subjectProps);
    expect(subject.name).toBe(subjectProps.name);
  });
});
