import { Ride } from "src/ride/entities/ride.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tickets')
export class Ticket {

    @PrimaryGeneratedColumn()
    ticketId:number

    @CreateDateColumn()
    bookedAt:Date

    @ManyToOne(()=>Ride,(r)=>r.ticket)
    ride:Ride

    @ManyToOne(()=>User,(p)=>p.tickets)
    passenger:User

}
