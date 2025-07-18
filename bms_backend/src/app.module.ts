import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BusModule } from './bus/bus.module';
import { RideModule } from './ride/ride.module';
import { TicketModule } from './ticket/ticket.module';
import { HasingModule } from './hasing/hasing.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig),AuthModule, UserModule, BusModule, RideModule, TicketModule, HasingModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
