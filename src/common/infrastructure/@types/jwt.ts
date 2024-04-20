import { ROLES } from '@/common/domain/enums/roles.enum';
import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';

export type ParsedJwt<T extends object> = T & JwtPayload;

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
