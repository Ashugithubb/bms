import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) { }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  create(@Body() createBusDto: CreateBusDto, @Req() req) {
    console.log(req.user);
    const email = req.user.email;
    if (req.user.role !== 'Owner') return new UnauthorizedException('you are not Owner');
    return this.busService.create(createBusDto, email);
  }

  @Get()
  findAll() {
    return this.busService.findAll();
  }

  @Get(':id')
  busDetails(@Param('id') id: string) {
    return this.busService.busDetails(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(+id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.remove(+id);
  }
}
