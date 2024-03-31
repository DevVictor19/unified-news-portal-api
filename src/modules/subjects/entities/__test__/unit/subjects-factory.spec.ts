import { CreateSubjectProps, SubjectsFactory } from '../../subjects.factory';

describe('SubjectsFactory unit tests', () => {
  let sut: SubjectsFactory;
  let subjectProps: CreateSubjectProps;

  beforeEach(() => {
    sut = new SubjectsFactory();

    subjectProps = {
      name: 'subject name',
    };
  });

  it('Should create a subject with all provided props', () => {
    const subject = sut.create(subjectProps);
    expect(subject.name).toBe(subjectProps.name);
  });
});
