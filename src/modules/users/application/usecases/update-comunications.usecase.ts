import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { COMUNICATIONS } from '@/common/domain/enums/comunications.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  user_id: string;
  payload: COMUNICATIONS[];
};

type Output = void;

@Injectable()
export class UpdateComunicationsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.databaseService.users.findById(input.user_id);

    if (!user) {
      throw new NotFoundError();
    }

    user.comunications = input.payload;

    await this.databaseService.users.update(input.user_id, user);
  }
}
