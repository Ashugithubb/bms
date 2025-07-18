import { Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { RideSearchDto } from 'src/ride/dto/ride.search.dto';

@Injectable()
export class BusService {

  constructor(@InjectRepository(Bus) private readonly busRepo: Repository<Bus>,
    private readonly userService: UserService) { }

  async create(createBusDto: CreateBusDto, email: string) {
    const model = createBusDto.model

    const existing = await this.busRepo.findOneBy({ model })
    if (existing) return { "msg": "This Bus Already exists" };

    const user = await this.userService.findOneByemail(email);
    if(!user) return {"msg": "User is not found"}
    
    const newBus = this.busRepo.create({
      ...createBusDto,
      owner: user
    })

    await this.busRepo.save(newBus);
    return { "msg": "added Bus" }
  }

  async busDetails(busId: number) {
    return await this.busRepo.findOneBy({busId});
  }


  




  findAll() {
    return `This action returns all bus`;
  }
  update(id: number, updateBusDto: UpdateBusDto) {
    return `This action updates a #${id} bus`;
  }
  remove(id: number) {
    return `This action removes a #${id} bus`;
  }
}
