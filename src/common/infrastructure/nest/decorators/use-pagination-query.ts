import { UseInterceptors } from '@nestjs/common';

import { ParseOrderQueryInterceptor } from '../interceptors/parse-order-query.interceptor';
import { ParseSearchQueryInterceptor } from '../interceptors/parse-search-query.interceptor';

export const UsePaginationQuery = () => {
  return UseInterceptors(
    ParseSearchQueryInterceptor,
    ParseOrderQueryInterceptor,
  );
};
