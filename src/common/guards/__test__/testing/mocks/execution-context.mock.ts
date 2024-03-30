import { ExecutionContext } from '@nestjs/common';

export const ExecutionContextMock: Partial<
  Record<jest.FunctionPropertyNames<ExecutionContext>, jest.MockedFunction<any>>
> = {
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn(),
    getResponse: jest.fn(),
  }),
  getHandler: jest.fn(),
  getClass: jest.fn(),
};
