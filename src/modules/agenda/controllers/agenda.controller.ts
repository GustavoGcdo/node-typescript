import { Body, Post, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { RoomBookService } from '../services/room-book.service';
import { BookRoomDto } from '../dtos/book-room.dto';
import { JwtAuthGuard } from '../../../shared/guards/auth.guard';
import { Result } from '../../backoffice/models/result.model';
import { BookRoomCommand } from '../commands/book-room.command';

export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() model: BookRoomDto) {

        try {
            const command = new BookRoomCommand(request.user.document, model.roomId, model.date);
            await this.service.Book(command);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel reservar sua sala', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
