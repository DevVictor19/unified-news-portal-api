import { compile } from 'handlebars';
import { readFileSync } from 'node:fs';

import { ITemplateEngineProvider } from '../template-engine-provider.interface';

export class HandleBarsTemplateEngineProvider
  implements ITemplateEngineProvider
{
  compile(
    templatePath: string,
    variables?: { [key: string]: string | object } | undefined,
  ): string {
    const html = readFileSync(templatePath).toString();

    const template = compile(html);

    return template(variables);
  }
}
