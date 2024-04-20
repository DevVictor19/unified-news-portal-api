import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

const ProtectedRoute = () => {
  return UseGuards(AuthGuard, RolesGuard);
};

export default ProtectedRoute;
