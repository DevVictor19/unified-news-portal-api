export abstract class ITemplateEngineProvider {
  abstract compile(
    fileName: string,
    variables?: { [key: string]: string | object },
  ): string;
}
