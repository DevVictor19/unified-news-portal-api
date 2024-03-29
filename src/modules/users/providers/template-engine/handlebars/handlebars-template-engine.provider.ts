import { compile } from 'handlebars';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ITemplateEngineProvider } from '../template-engine-provider.interface';

export class HandleBarsTemplateEngineProvider
  implements ITemplateEngineProvider
{
  compile(
    fileName: string,
    variables?: { [key: string]: string | object } | undefined,
  ): string {
    const workdir = process.cwd();
    const html = readFileSync(join(workdir, 'templates', fileName)).toString();

    const template = compile(html);

    return template(variables);
  }
}
