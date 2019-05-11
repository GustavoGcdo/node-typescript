import { Injectable } from '@nestjs/common';
import { Room } from '../models/room.model';

@Injectable()
export class RoomRepository {
    async checkAvaliability(id: string, date: Date): Promise<Room> {
        console.log('Recuperando sala....');
        return new Room('breibreibrei');
    }

    async book(room: Room) {
        // TODO: Salvar no banco
    }
}
