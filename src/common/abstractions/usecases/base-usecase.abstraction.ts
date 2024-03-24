export interface IBaseUseCase<Input, Output> {
  execute(input: Input): Output | Promise<Output>;
}
