import { JwtPayload } from 'src/modules/users/providers/jwt/jwt-provider.interface';

export type ParsedJwt<T extends object> = T & JwtPayload;
