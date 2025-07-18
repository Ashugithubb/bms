import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from 'src/ride/entities/ride.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { RideService } from 'src/ride/ride.service';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(@InjectRepository(Ticket)  private ticketRepo:Repository<Ticket>,
              private readonly userService : UserService,
              private readonly rideService:RideService){}

  async bookTicket(userId:number,rideId:number) {
    console.log(userId," ",rideId);
    const  passenger = await this.userService.findOne(userId);
    if(!passenger) return {"msg":"Passenger n0t f0und"}
    const ride = await this.rideService.findOneByRideId(rideId);
    if(!ride) return {"msg":"No Ride is Available"}
    const newTicket =  this.ticketRepo.create({
        passenger:passenger,
        ride:ride
    })
    return await this.ticketRepo.save(newTicket);
  }

async viewPreviousRide(userId:number){

    const rides= await this.ticketRepo.find({
      relations:['passenger','ride']
    })
    if(!rides) return {"msg":"No Previous Rides"}
    return rides.filter((p)=>p.passenger.id===userId);
  }



  findAll() {
    return `This action returns all ticket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
