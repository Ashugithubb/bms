import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:rideId')
  create(@Param('rideId') rideId:string, @Req() req) {
    return this.ticketService.bookTicket(+req.user.id,+rideId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ride/history')
async viewPreviousRide(@Req() req){
    return this.ticketService.viewPreviousRide(+req.user.id);
}



}


























// @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ticketService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
  //   return this.ticketService.update(+id, updateTicketDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketService.remove(+id);
  // }
  // @Get()
  // findAll() {
  //   return this.ticketService.findAll();
  // }