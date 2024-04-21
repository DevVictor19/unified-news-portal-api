import { Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ITemplateEngineProvider } from '@/modules/users/application/providers/template-engine-provider.interface';

@Injectable()
export class TemplateEngineProvider implements ITemplateEngineProvider {
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
