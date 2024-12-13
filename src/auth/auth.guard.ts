// src/auth/auth.guard.ts

import { Injectable } from '@nestjs/common'; // Injectable decorator for making the guard injectable
import { AuthGuard } from '@nestjs/passport'; // Base AuthGuard provided by @nestjs/passport for handling authentication

/**
 * A guard for protecting routes using JWT-based authentication.
 * This guard extends the default AuthGuard provided by Passport,
 * configured to use the 'jwt' strategy.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // The 'jwt' strategy is defined in the JwtStrategy class and specifies how
  // the token is verified and how the payload is extracted.
}
