import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';
import { Ride } from 'src/ride/entities/ride.entity';
import { UserModule } from 'src/user/user.module';
import { RideModule } from 'src/ride/ride.module';

@Module({
  imports:[TypeOrmModule.forFeature([Ticket]),UserModule,RideModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
