import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Result } from 'src/modules/backoffice/models/result.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {

    constructor(public contract: Contract) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(
                new Result('Ops, algo saiu nao bom', false, null, this.contract.errors),
                HttpStatus.BAD_REQUEST);
        }
        return next.handle();
    }

}
