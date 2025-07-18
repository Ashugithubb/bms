import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../enums/bus.enum";
import { User } from "src/user/entities/user.entity";
import { Ride } from "src/ride/entities/ride.entity";

@Entity('bus')
export class Bus {
    @PrimaryGeneratedColumn()
    busId:number

    @Column({unique:true})
    model:string

    @Column()
    color:string

    @Column({default: 35})
    total_seats:number

    @Column({type:'enum',enum:Category,default:Category.NON_AC} )
    category:Category

    @Column({unique:true})
    regno:string

    @CreateDateColumn()
    registeredAt:Date

    @ManyToOne(()=>User,(u)=>u.bus)
    owner:User

    @OneToMany(()=>Ride,(r)=>r.bus,{ onDelete: 'CASCADE' })
    ride:Ride[]


}
