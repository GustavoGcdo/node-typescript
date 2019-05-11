import { CommandBus } from '@nestjs/cqrs';
import { BookRoomCommand } from '../commands/book-room.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomBookService {
  constructor(private readonly commandBus: CommandBus) {}
  async Book(command: BookRoomCommand) {
    console.log('RoomBookService - Executando o serviço...');

    return await this.commandBus.execute(command);
  }
}
