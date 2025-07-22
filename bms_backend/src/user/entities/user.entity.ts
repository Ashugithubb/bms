import { MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender, Role } from "../enums/all.enums";
import { Bus } from "src/bus/entities/bus.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.MALE,
    })
    gender: Gender   

    @Column({ unique: true })
    email: string

    @Column({select:false})
    password: string

    @Column()
    @MinLength(10, { message: 'Phone number must be at  10 digits long.' })
    phone: string

   
    
    @Column({ type: 'enum', enum: Role ,default:Role.PASSANGER})
    role: Role

    @CreateDateColumn()
    createdAt: Date



    @OneToMany(()=>Bus,(b)=>b.owner)
    bus:Bus[]

    @OneToMany(()=>Ticket,(t)=>t.passenger)
    tickets:Ticket[]


}
