import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { ILike, Repository } from 'typeorm';
import { BusService } from 'src/bus/bus.service';
import { RideSearchDto } from './dto/ride.search.dto';

@Injectable()
export class RideService {
  constructor(@InjectRepository(Ride) private readonly rideRepo: Repository<Ride>,
    private readonly busService: BusService) { }
  async createRide(createRideDto: CreateRideDto, busId: number) {
    const bus = await this.busService.busDetails(busId);
    if (!bus) return { "msg": "Bus does not exist" }
    const newRide = await this.rideRepo.create({
      ...createRideDto,
      bus
    })
    await this.rideRepo.save(newRide);
    return { "msg": "Ride Published" };
  }

  async findAllRideFromSourceToDestination(rideSearchDto: RideSearchDto) {
    const { pickup_location, dropoff_location, ride_Date, departure_time, category } = rideSearchDto;
    const rides= await this.rideRepo.find({
      where: {
        source: ILike(`%${pickup_location}`),
        destination: ILike(`%${dropoff_location}`),
        ride_Date,
        departure_time
      },
      relations:['bus']
      
    }
    );
    return rides.filter((c)=>c.bus.category==category);
  }


  async findAllBusesFromSourceToDestination(buseSearchdto:RideSearchDto){
    const { pickup_location, dropoff_location, ride_Date, departure_time, category } = buseSearchdto;
    const rides= await this.rideRepo.find({
      where: {
        source: ILike(`%${pickup_location}`),
        destination: ILike(`%${dropoff_location}`),
        ride_Date,
        departure_time
      },
      relations:['bus'],
      take:10,
    }
    );
    // return rides;
    return rides.map((r) => ({
  fare: r.fare,
  bus: r.bus,
}))
  }

  // async viewBusRideHistory(busId:number){
  //    const allRides = await this.rideRepo.find(
  //     {relations:['bus']}
  //    );
  //    console.log(allRides);
  //    return allRides.filter((b)=>b.bus.busId===busId);
  // }

  async viewBusRideHistory(busId: number) {
  return await this.rideRepo.find({
    where: {
      bus: { busId }
    },
    relations: ['bus'], 
    order: {
      ride_Date: 'DESC', 
    },
  });
}



  async findOneByRideId(rideId: number) {
    return await this.rideRepo.findOneBy({ rideId });
  }

  async update(id: number, updateRideDto: UpdateRideDto) {
    return await this.rideRepo.update(id, updateRideDto);
  }

  async remove(id: number) {
    return await this.rideRepo.delete(id);
  }
}
