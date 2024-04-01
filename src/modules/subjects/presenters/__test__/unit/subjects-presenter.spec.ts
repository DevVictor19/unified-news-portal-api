import { faker } from '@faker-js/faker';

import { SubjectsPresenter } from '../../subjects.presenter';

describe('SubjectsPresenter unit tests', () => {
  it('Should format the provided output', () => {
    const subject = {
      _id: faker.database.mongodbObjectId(),
      name: faker.internet.domainName(),
      created_at: faker.date.anytime(),
      anyInfo1: 'random info1',
      anyInfo2: 'random info2',
    };

    const result = SubjectsPresenter.format(subject);

    expect(result).toStrictEqual({
      id: subject._id,
      name: subject.name,
      created_at: subject.created_at,
    });
  });
});
