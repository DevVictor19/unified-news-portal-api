export interface ITemplateEngineProvider {
  compile(
    fileName: string,
    variables?: { [key: string]: string | object },
  ): string;
}
