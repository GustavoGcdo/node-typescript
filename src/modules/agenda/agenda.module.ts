import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers/index';
import { AgendaController } from './controllers/agenda.controller';
import { EventsHandlers } from './events/handlers';
import { RoomRepository } from './repositories/room.repository';
import { RoomBookService } from './services/room-book.service';

@Module({
    imports: [CqrsModule],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        ...CommandHandlers,
        ...EventsHandlers
    ]
})
export class AgendaModule { }
