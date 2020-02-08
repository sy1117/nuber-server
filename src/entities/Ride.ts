import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, Entity } from "typeorm";
import User from "./User";

@Entity()
class Ride extends BaseEntity{
    @PrimaryGeneratedColumn() id:number;

    @Column({
        type:"text", 
        enum:["ACCEPTED", "FINISHIED", "CANCELED", "REQUESTING", "ONROUTE" ],
        default : "ACCEPTED",
    })
    status:string;

    @Column({type:"text"})
    pickUpAddress:string;
    @Column({type:"double precision"})
    pickUpLat:number;
    @Column({type:"double precision"})
    pickUpLng:number;

    @Column({type:"text"})
    dropOffAddress:string;
    @Column({type:"double precision"})
    dropOffLat:number;
    @Column({type:"double precision"})
    dropOffLng:number;

    @Column({type:"double precision"})
    price:number;
    @Column({type:"text"})
    distance:string;
    @Column({type:"text"})
    duration:string;

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;

    @ManyToOne(type => User, user=>user.ridesAsPassenger)
    passenger : User;

    @ManyToOne(type => User, user=>user.ridesAsDriver, {nullable:true})
    driver : User;
}

export default Ride;