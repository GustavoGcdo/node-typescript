import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Pet } from '../../models/pet.model';
import { Contract } from '../contract';

@Injectable()
export class CreatePetContract implements Contract {
    errors: any[];

    validate(model: Pet): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 2, 'Nome invalido');
        flunt.hasMinLen(model.gender, 3, 'Genero invalido');
        flunt.hasMinLen(model.kind, 3, 'Tipo invalido');
        flunt.hasMinLen(model.brand, 3, 'Raca invalido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
