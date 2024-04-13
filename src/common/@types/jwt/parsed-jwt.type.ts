import { JwtPayload } from '@/modules/common/jwt/jwt-provider.interface';

export type ParsedJwt<T extends object> = T & JwtPayload;
