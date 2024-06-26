import { UseInterceptors } from '@nestjs/common';

import { ParseJsonQueryInterceptor } from '../interceptors/parse-json-query.interceptor';

export const UsePaginationQuery = () => {
  return UseInterceptors(
    new ParseJsonQueryInterceptor('search'),
    new ParseJsonQueryInterceptor('order'),
  );
};
