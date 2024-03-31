import { Subject } from '../../subjects.entity';

describe('Subjects entity unit tests', () => {
  let subject: Subject;

  beforeEach(() => {
    subject = new Subject();
  });

  it('Should create an instance of Subject', () => {
    expect(subject).toBeInstanceOf(Subject);
  });
});
