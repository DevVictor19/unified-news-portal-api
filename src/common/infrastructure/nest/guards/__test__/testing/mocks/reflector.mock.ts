import { Reflector } from '@nestjs/core';

export const ReflectorMock: Partial<
  Record<jest.FunctionPropertyNames<Reflector>, jest.MockedFunction<any>>
> = {
  getAllAndOverride: jest.fn(),
};
