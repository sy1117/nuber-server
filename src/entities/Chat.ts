import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Entity, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import Message from "./Message";
import User from "./User";
import Ride from "./Ride";

@Entity()
class Chat extends BaseEntity{
    @PrimaryGeneratedColumn() id:number;

    @OneToMany(type => Message, message => message.chat)
    messages: [Message];

    @Column({type:"number"})
    passengerId : number;

    @ManyToOne(type=>User, user=>user.chatsAsPassenger)
    passenger : User;

    @Column({type : "number"})
    driverId : number;

    @ManyToOne(type=>User, user => user.chatsAsDriver)
    driver : User;

    @Column({nullable:true})
    rideId : number;

    @OneToOne(type=>Ride, ride=>ride.chat,{nullable:true})
    @JoinColumn()
    ride: Ride;

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;
}

export default Chat;