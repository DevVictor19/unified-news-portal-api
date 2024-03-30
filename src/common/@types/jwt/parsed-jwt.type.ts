import { JwtPayload } from '@/modules/common/jwt/providers/jwt/jwt-provider.interface';

export type ParsedJwt<T extends object> = T & JwtPayload;
