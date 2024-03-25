export interface ITemplateEngineProvider {
  compile(
    templatePath: string,
    variables?: { [key: string]: string | object },
  ): string;
}
