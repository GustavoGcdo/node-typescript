import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { CreditCard } from '../models/credit-card.model';
import { Contract } from './contract';
import { QueryDto } from '../dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {
    errors: any[];

    validate(model: QueryDto): boolean {
        const flunt = new Flunt();

        if (!model.query) {
            model.query = {};
        }

        flunt.isGreaterThan(model.take, 1000, 'Sua query nao pode retornar mais que 1000 registros');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
