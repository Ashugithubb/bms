import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { ILike, Repository } from 'typeorm';
import { BusService } from 'src/bus/bus.service';
import { RideSearchDto } from './dto/ride.search.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RideService {
  constructor(@InjectRepository(Ride) private readonly rideRepo: Repository<Ride>,
    private readonly busService: BusService,
    private readonly userService:UserService) { }
  async createRide(createRideDto: CreateRideDto,userId:number) {
    const user = await this.userService.findOne(userId);
    const busId =1;
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
    const { source, destination, ride_Date, departure_time, category } = rideSearchDto;
    const rides = await this.rideRepo.find({
      where: {
        source: ILike(`%${source}`),
        destination: ILike(`%${destination}`),
        ride_Date,
        departure_time
      },
      relations: ['bus']

    }
    );
    return rides.filter((c) => c.bus.category == category);
  }


  async findAllBusesFromSourceToDestination(buseSearchdto: RideSearchDto) {
    const { source, destination, ride_Date, departure_time, category } = buseSearchdto;
    const rides = await this.rideRepo.find({
      where: {
        source: ILike(`%${source}`),
        destination: ILike(`%${destination}`),
        ride_Date,
        departure_time
      },
      relations: ['bus'],
      take: 10,
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

  async findSources(source: string) {
    return await this.rideRepo.find({
        where: {source: ILike(`%${source}%`)},
        take: 5,
        select:['source']
      })
 }

async findDestination(destination: string) {
    return await this.rideRepo.find({
        where: {destination: ILike(`%${destination}%`)},
        take: 5,
        select:['destination']
      })
 }




}



