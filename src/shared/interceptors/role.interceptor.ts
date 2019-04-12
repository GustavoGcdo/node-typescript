import { ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Result } from 'src/modules/backoffice/models/result.model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        // tslint:disable-next-line:no-console
        console.log(payload);

        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(role)) {
                hasRole = true;
            }
        });

        if (!hasRole) {
            throw new HttpException(
                new Result('Acesso não autorizado', false, null, null),
                HttpStatus.FORBIDDEN);
        }

        return next.handle();
    }
}
