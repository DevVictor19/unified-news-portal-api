import { SetMetadata } from '@nestjs/common';

import { ROLES } from '@/common/domain/enums/roles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);

export const AdminRoute = () => Roles(ROLES.ADMIN);

export const CoordinatorRoute = () => Roles(ROLES.ADMIN, ROLES.COORDINATOR);

export const TeacherRoute = () =>
  Roles(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.TEACHER);

export const LeaderRoute = () =>
  Roles(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.TEACHER, ROLES.LEADER);

export const ViceLeaderRoute = () =>
  Roles(
    ROLES.ADMIN,
    ROLES.COORDINATOR,
    ROLES.TEACHER,
    ROLES.LEADER,
    ROLES.VICE_LEADER,
  );

export const StudentRoute = () =>
  Roles(
    ROLES.ADMIN,
    ROLES.COORDINATOR,
    ROLES.TEACHER,
    ROLES.LEADER,
    ROLES.VICE_LEADER,
    ROLES.STUDENT,
  );
