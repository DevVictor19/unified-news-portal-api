import { ParsedJwt } from '../jwt/parsed-jwt.type';

import { ROLES } from '@/common/enums/roles.enum';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';

export type EmailVerificationJwtPayload = {
  email: string;
  token_type: TOKEN_TYPE.EMAIL_VERIFY;
};

export type EmailVerificationJwtParsed = ParsedJwt<EmailVerificationJwtPayload>;

export type AuthJwtPayload = {
  userId: string;
  role: ROLES;
  token_type: TOKEN_TYPE.AUTH;
};

export type AuthJwtParsed = ParsedJwt<AuthJwtPayload>;

export type PasswordRecoveryJwtPayload = {
  userId: string;
  token_type: TOKEN_TYPE.PASSWORD_RECOVERY;
};

export type PasswordRecoveryJwtParsed = ParsedJwt<PasswordRecoveryJwtPayload>;
